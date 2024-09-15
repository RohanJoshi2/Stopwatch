import { StyleSheet, Text, View, Button } from 'react-native';
import { Stopwatch } from '@/components/Stopwatch';

export default function App() {

  return (
    <View style={styles.container}>
      <Stopwatch/>
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
  text: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
  },
});