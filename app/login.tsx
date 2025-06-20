import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from "react-native";
import React, { useState, useContext } from "react";
import { router, useLocalSearchParams, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "./_layout";

const THEME_COLOR = '#3498db';

const LoginScreen: React.FC = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is undefined");
  }
  const { registeredUsers, login } = userContext;

  const { redirect, ...restParams } = useLocalSearchParams();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Silakan isi username dan password.");
      return;
    }
    
    // Hardcode user untuk kemudahan testing
    const hardcodedUser = { username: 'user', password: 'password' };
    const userFound = registeredUsers.find((u) => u.username === username && u.password === password);

    if (username === hardcodedUser.username && password === hardcodedUser.password || userFound) {
      const userToLogin = userFound || hardcodedUser;
      login(userToLogin);
      
      if (typeof redirect === 'string' && redirect) {
        router.replace({ pathname: redirect as Href, params: restParams });
      } else {
        router.replace("/");
      }
    } else {
      Alert.alert("Error", "Username atau password salah.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Selamat Datang!</Text>
      <Text style={styles.subtitle}>Masuk untuk melanjutkan ke toko kami</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Username (coba: user)" placeholderTextColor="#aaa" value={username} onChangeText={setUsername} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password (coba: password)" secureTextEntry={true} placeholderTextColor="#aaa" value={password} onChangeText={setPassword} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Masuk</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signUpText}> Daftar di sini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 55,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingVertical: 18,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    shadowColor: THEME_COLOR,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: 'center'
  },
  footerText: {
    fontSize: 16,
    color: "#888",
  },
  signUpText: {
    color: THEME_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
});