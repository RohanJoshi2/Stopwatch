import { StyleSheet, Text, View } from 'react-native';
import { Clock } from '@/components/Clock';

export default function App() {
  return (
    <View style={styles.container}>
      <Clock/>
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
  },
});