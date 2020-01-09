import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Logo from './components/Logo';
import RandomArc from './components/RandomArc';

const Spacing = () => <View style={styles.spacing} />;
const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Spacing />
        <Logo />
        <Spacing />
        <RandomArc />
        <Spacing />
        <Text style={styles.text}>More examples soon!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  spacing: {
    marginTop: 50,
  },
});

export default App;
