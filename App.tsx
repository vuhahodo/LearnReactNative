import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {useState} from 'react';

  const quotes = [
    "Yêu",
    "Không",
    "Khog biet",
  ];

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [quote,setQuote] = useState<string>("Yêu nhau nha")
  const [name, setName] = useState<string>("");

  function handlePress() {
    setCount(0);
  }
  function handlePressLove() {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex]);
  }  
  
  return (
    <View style={styles.container}>
      <Text style ={styles.test}>Hello World</Text>
      <Text style ={styles.editText}>What the helk</Text>
      <Button
        title={count.toString()}
        onPress={() => setCount(count + 1)}
      />
      <View style={{ marginTop: 20 , marginBottom: 20 }}>
        <Button 
          color={"red"}
          title="Reset Count"
          onPress={handlePress}
        />
      </View>
      <View>
        <Text style={styles.Text}>Yêu hay không </Text>
        <Button
          title  = {quote}
          color = "pink"
          onPress={handlePressLove}
        />

      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.Text}>Name: {name}</Text>
        <TextInput
          multiline
          autoCapitalize='characters'
          style={{  borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 20,padding: 10,margin: 5 }}
          placeholder="Input your name!"
          onChangeText={(value) => setName(value)}
          maxLength={2}
          keyboardType="numeric"
          
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',

  },
  editText: {
    fontSize: 40,
    color: 'pink',
    fontWeight: 'bold',
  },
  test: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'normal',
  }
});
