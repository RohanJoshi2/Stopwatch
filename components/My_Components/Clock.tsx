import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

export function Clock() {
  const [time, setTime] = useState(new Date());
  
  const timer = setInterval (() => {
    setTime(new Date());
  }, 1000);
  
  const hours = time.getHours();
  const minutes = time.getMinutes();
  
  const formattedHours = (hours % 12 || 12).toString();
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <Text style={styles.text}>{formattedHours}:{formattedMinutes} {ampm}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});