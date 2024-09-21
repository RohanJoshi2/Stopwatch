import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';

export function Stopwatch() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]); // Store lap times
  const startTimeRef = useRef(0);
  const intervalRef = useRef(setInterval(() => {}, 0));

  const start = () => {
    if (!running) {
      setRunning(true);
      startTimeRef.current = Date.now() - (
        time.hours * 3600000 +
        time.minutes * 60000 +
        time.seconds * 1000 +
        time.milliseconds
      );
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const diff = now - startTimeRef.current;

        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        const milliseconds = diff % 1000;

        setTime({ hours, minutes, seconds, milliseconds });
      }, 1);
    }
  };

  const pause = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    setRunning(false);
    setLaps([]); // Clear laps on reset
  };

  const lap = () => {
    if (running) {
      const formattedLap = formatTime(time);
      setLaps(prevLaps => [...prevLaps, formattedLap]); // Add the current time to laps
    }
  };

  const clear = () => {
    setLaps([]); // Clear all lap times
  };

  const removeLap = (index: number) => {
    setLaps((prevLaps) => prevLaps.filter((_, lapIndex) => lapIndex !== index));
  };

  const formatTime = (time: { hours: any; minutes: any; seconds: any; milliseconds: any }) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}:${time.milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button title='start' onPress={start} />
        <Button title='pause' onPress={pause} />
        <Button title='reset' onPress={reset} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='lap' onPress={lap} />
        <Button title='clear' onPress={clear} />
      </View>
      <ScrollView style={styles.lapContainer}>
        {laps.map((lap, index) => (
          <View key={index} style={styles.lapRow}>
            <Text style={styles.lapText}>{`Lap ${index + 1}: ${lap}`}</Text>
            <TouchableOpacity onPress={() => removeLap(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>✕</Text> {/* "X" button */}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
  },
  lapContainer: {
    width: '80%',
    marginTop: 20,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  lapText: {
    color: 'white',
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
  },
});