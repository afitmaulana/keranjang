import React, { useState, createContext, ReactNode } from 'react';
import { Stack } from 'expo-router';

interface User {
  username: string;
  password: string;
}

interface UserContextType {
  registeredUsers: User[];
  onUserRegistered: (newUserData: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const handleUserRegistration = (newUserData: User) => {
    setRegisteredUsers([...registeredUsers, newUserData]);
    console.log('Pengguna terdaftar:', newUserData);
  };

  return (
    <UserContext.Provider
      value={{ registeredUsers, onUserRegistered: handleUserRegistration }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="todolist" options={{ headerShown: false }} />
      </Stack>
      {children}
    </UserContext.Provider>
  );
}
