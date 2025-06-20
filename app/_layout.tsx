import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { Stack, router, useRootNavigationState } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

// Definisikan tipe User
interface User {
  username: string;
  password: string;
}

// Perbarui tipe UserContext
interface UserContextType {
  registeredUsers: User[];
  onUserRegistered: (newUserData: User) => void;
  currentUser: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook untuk mengecek status navigasi
function useProtectedRoutes(user: User | null) {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Tunggu sampai navigasi siap

    if (!user) {
      // Jika tidak ada user, paksa ke halaman login
      router.replace('/login');
    } else {
      // Jika ada user, paksa ke halaman utama (toko)
      router.replace('/');
    }
  }, [user, rootNavigationState?.key]);
}

export default function RootLayout() {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading awal

  // Cek sesi login saat aplikasi dimuat (simulasi)
  useEffect(() => {
    // Di aplikasi nyata, Anda akan memeriksa AsyncStorage atau token di sini
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulasi loading
  }, []);

  useProtectedRoutes(currentUser);

  const handleUserRegistration = (newUserData: User) => {
    setRegisteredUsers((prevUsers) => [...prevUsers, newUserData]);
  };

  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <UserContext.Provider
      value={{
        registeredUsers,
        onUserRegistered: handleUserRegistration,
        currentUser,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="payment" options={{ presentation: 'modal', title: "Pembayaran", headerShown: true }} />
      </Stack>
    </UserContext.Provider>
  );
}