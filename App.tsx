import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

interface Todo {
  id: number;
  text: string;
}

function randomId(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function TodoApp() {
  const [todos, setTodos] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (todos.trim() === '') {
      Alert.alert('Error', 'Please enter a valid task.');
      return;
    }

    if (editingId !== null) {
      // Sửa todo hiện tại
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: todos } : todo
        )
      );
      setEditingId(null);
    } else {
      // Thêm mới
      setTodoList([...todoList, { id: randomId(2, 2000000), text: todos }]);
    }

    setTodos('');
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== id));
        },
      },
    ]);
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todoList.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTodos(todoToEdit.text);
      setEditingId(todoToEdit.id);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>🎯 Todo App</Text>

      <TextInput
        placeholder="Type your task..."
        style={styles.input}
        value={todos}
        onChangeText={setTodos}
      />

      <View style={styles.buttonContainer}>
        <Button title={editingId ? 'Update Todo' : 'Add Todo'} onPress={handleAddTodo} color="#1e90ff" />
      </View>

      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <View style={styles.swipeDeleteBox}>
                <Text style={styles.swipeDeleteText}>Xóa</Text>
              </View>
            )}
            renderLeftActions={() => (
              <View style={styles.swipeEditBox}>
                <Text style={styles.swipeEditText}>Sửa</Text>
              </View>
            )}
            onSwipeableRightOpen={() => handleDeleteTodo(item.id)}
            onSwipeableLeftOpen={() => handleEditTodo(item.id)}
            overshootRight={false}
          >
            <Pressable
              style={({ pressed }) => [
                styles.todoItem,
                pressed && {
                  transform: [{ scale: 0.97 }],
                  backgroundColor: '#dbeeff',
                  shadowOpacity: 0.2,
                },
              ]}
            >
              <Text style={styles.todoText}>{item.text}</Text>
            </Pressable>
          </Swipeable>
        )}
      />
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TodoApp />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 100,
  },
  todoItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#1e90ff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  swipeDeleteBox: {
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    height: '90%',
  },
  swipeDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  swipeEditBox: {
    backgroundColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    height: '90%',
  },
  swipeEditText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
