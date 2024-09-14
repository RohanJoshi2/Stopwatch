import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const startTime = useRef(0);
  const interval = useRef(0);

  const start = () => {
    setRunning(true);
    startTime.current = Date.now() - time * 1000;
    interval.current = setInterval(() => {
      setTime(Math.round((Date.now() - startTime.current)/1000));
    }, 1000);
  }

  const pause = () => {
    clearInterval(interval.current);
    setRunning(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{time}</Text>
      <View style={styles.buttonContainer}>
        <Button title='Start' onPress={start}></Button>
        <Button title='Pause' onPress={pause}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
  },
});