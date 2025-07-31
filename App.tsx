import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native';

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
  return (
    <View style = {styles.container}>
      <Text style ={{fontSize:30}}>Hello World!</Text>
      <FlatList
      data= {students}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={({item}) => {
        return (
          <View style={styles.body}>
            <Text>{item.name}</Text>
            <Text>Age: {item.age}</Text>
          </View>
        );
      }}
      />


      {/* <ScrollView>
        {students.map(item => {
            return(
              <View key={item.id} style={styles.body}>
                <Text>{item.name}</Text>
                <Text>Age: {item.age}</Text>
              </View>
            )
        })}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 20,
    marginHorizontal: 30,
  }
});
