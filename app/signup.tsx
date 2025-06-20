import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "./_layout";

const SignUpScreen: React.FC = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is undefined, make sure you are using RootLayout as a parent component.");
  }
  const { onUserRegistered } = userContext;

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleSignUp = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Silakan isi semua field.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Format email tidak valid. Gunakan format @gmail.com");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password dan Konfirmasi Password tidak sama.");
      return;
    }

    onUserRegistered({ username, password });

    Alert.alert("Berhasil", "Akun berhasil dibuat!");

    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun</Text>
      <Text style={styles.subtitle}>Buat akun baru Anda</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" value={username} onChangeText={setUsername} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" placeholderTextColor="#888" value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#888" value={password} onChangeText={setPassword} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Konfirmasi Password" secureTextEntry placeholderTextColor="#888" value={confirmPassword} onChangeText={setConfirmPassword} />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Daftar</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.alreadyAccountText}>Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.loginText}> Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#1e88e5",
    borderRadius: 8,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  alreadyAccountText: {
    fontSize: 16,
    color: "#555",
  },
  loginText: {
    color: "#1e88e5",
    fontSize: 16,
    fontWeight: "bold",
  },
});
