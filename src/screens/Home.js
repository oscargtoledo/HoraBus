// ./screens/Home.js

import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import Header from '../navigation/Header';
import GeneralMenu from '../utils/GeneralMenu';

const Home = ({ navigation }) => {
  return (
    <Surface style={styles.center}>
      <Text>This is the home screen</Text>
      <Button
        title="Go to About Screen"
        onPress={() => navigation.navigate('About')}
      />
      {/* <Header></Header> */}
    </Surface>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Home;
