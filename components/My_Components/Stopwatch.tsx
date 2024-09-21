import { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

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
        <TouchableOpacity style={styles.button} onPress={start}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pause}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={lap}>
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
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
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    width: '80%',
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
  },
  lapContainer: {
    width: '80%',
    maxHeight: '30%',
    marginTop: 20,
  },
  lapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  lapText: {
    color: 'white',
    fontSize: 18,
  },
  deleteButton: {
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 16,
  },
  button: {
    backgroundColor: '#00a6ed', // Standard button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '30%', // Standardized width for all buttons
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
