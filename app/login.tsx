import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "./_layout";

const IndexScreen: React.FC = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is undefined, make sure you are using RootLayout as a parent component.");
  }
  const { registeredUsers } = userContext;

  const { registeredUsername } = useLocalSearchParams();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (registeredUsername) {
      setUsername(registeredUsername as string);
    }
  }, [registeredUsername]);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Silakan isi username dan password.");
      return;
    }

    const user = registeredUsers.find((user) => user.username === username && user.password === password);

    if (user) {
      Alert.alert("Berhasil", `Login berhasil untuk pengguna: ${username}`);
      router.push("/todolist");
    } else {
      Alert.alert("Error", "Data tidak valid.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Selamat Datang kembali</Text>
      <Text style={styles.subText}>Masukkan Data Anda untuk masuk</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" value={username} onChangeText={setUsername} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} placeholderTextColor="#888" value={password} onChangeText={setPassword} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => {}}>
        <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.dontHaveAccountText}>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signUpText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  subText: {
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
  loginButton: {
    backgroundColor: "#1e88e5",
    borderRadius: 8,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: "#1e88e5",
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  dontHaveAccountText: {
    fontSize: 16,
    color: "#555",
  },
  signUpText: {
    color: "#1e88e5",
    fontSize: 16,
    fontWeight: "bold",
  },
});
