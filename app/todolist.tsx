import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleEditTodo = (id: string, currentText: string) => {
    setEditingTodoId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo)));
      setEditingTodoId(null);
      setEditText("");
    } else {
      Alert.alert("Peringatan", "Teks todo tidak boleh kosong.");
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      {editingTodoId === item.id ? (
        <TextInput style={styles.editTextInput} value={editText} onChangeText={(text) => setEditText(text)} onSubmitEditing={() => handleSaveEdit(item.id)} blurOnSubmit />
      ) : (
        <Text style={[styles.todoText, item.completed && styles.completedText]}>{item.text}</Text>
      )}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
          <Feather name={item.completed ? "check-square" : "square"} size={20} color="black" />
        </TouchableOpacity>
        {editingTodoId !== item.id ? (
          <TouchableOpacity style={styles.actionButton} onPress={() => handleEditTodo(item.id, item.text)}>
            <MaterialIcons name="edit" size={20} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.actionButton} onPress={() => handleSaveEdit(item.id)}>
            <MaterialIcons name="save" size={20} color="green" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteTodo(item.id)}>
          <MaterialIcons name="delete-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.subtitle}>Ini adalah daftar tugasku untuk bulan ini</Text>
      </View>
      <FlatList data={todos} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
          onSubmitEditing={handleAddTodo}
          blurOnSubmit={false}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAddTodo}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  todoText: {
    fontSize: 16,
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 15,
  },
  inputArea: {
    marginTop: 20,
  },
  input: {
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editTextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
});
