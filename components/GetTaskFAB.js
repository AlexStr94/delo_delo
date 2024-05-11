import * as React from 'react';
import { StyleSheet } from 'react-native'
import { FAB, Portal } from 'react-native-paper';

export default GetTaskFAB = () => {
  return (
    <Portal>
      <FAB 
        icon="dice-multiple"
        style={styles.fab}
      />
    </Portal>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})