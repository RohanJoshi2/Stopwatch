import { useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export function Stopwatch() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const [running, setRunning] = useState(false);
  const startTimeRef = useRef(0);
  const intervalRef = useRef(null);

  const updateTime = useCallback(() => {
    const now = Date.now();
    const diff = now - startTimeRef.current;

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const milliseconds = diff % 1000;

    setTime({ hours, minutes, seconds, milliseconds });
  }, []);

  const start = () => {
    if (!running) {
      setRunning(true);
      startTimeRef.current = Date.now() - (
        time.hours * 3600000 +
        time.minutes * 60000 +
        time.seconds * 1000 +
        time.milliseconds
      );
      intervalRef.current = setInterval(updateTime, 1);
    }
  };

  const pause = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    setRunning(false);
  };

  const formatTime = (time) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}:${time.milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button title='Start' onPress={start} />
        <Button title='Pause' onPress={pause} />
        <Button title='Stop' onPress={stop} />
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
    fontSize: 40,
    marginBottom: 20,
  },
});