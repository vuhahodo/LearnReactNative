import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native';

interface Itodo{
  id: number;
  name: string;
}
function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function App() {
  const [students, setStudents] = useState([
    {id: 1, name: 'John Doe', age: 20,},
    {id: 2, name: 'Jane Smith', age: 22},
    {id: 3, name: 'Sam Brown', age: 19},
    {id: 4, name: 'Lisa White', age: 21},
    {id: 5, name: 'Tom Green', age: 23},
    {id: 6, name: 'Emma Black', age: 20},
    {id: 7, name: 'Chris Blue', age: 22},
    {id: 8, name: 'Olivia Red', age: 19},
    {id: 9, name: 'Liam Yellow', age: 21},
    {id: 10, name: 'Sophia Purple', age: 23},
  ]);
    const [todos, setTodos] = useState("");
  const [todoList, setTodoList] = useState<Itodo[]>([]);
const handleAddTodo = () => {
        if (todos.trim() === "") {
          alert("Please enter a todo item.");
        }
          setTodoList([...todoList,
             { id: randomInteger(2, 2000000), name: todos}]);
          setTodos("");
        }

  return (
    <View style = {styles.container}>
      {/* header */}
      <Text style = {styles.header}>TODO APP</Text>
      {/* form */}
      <View>
        <TextInput style={styles.todoInput}
          placeholder="Enter todo"
          value={todos}
          onChangeText={(text) => setTodos(text)}
        />

        <Button title="Add Todo" onPress={handleAddTodo} />
      </View>
      {/* list todo */}
      <View style={styles.body}>
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.todoItem}>
              {item.name}
            </Text>
          )}
        />
   
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {

    padding: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkblue',
    shadowColor: '#000',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',

   
  },
  body: {
    padding: 30,
    backgroundColor: 'pink',
    borderRadius: 10,
    margin: 20,
    marginHorizontal: 10,
  },
  todoInput: {
    height: 40,
    borderColor: 'green',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  todoItem: {

    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
});
