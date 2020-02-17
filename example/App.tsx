import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Logo from './components/Logo';
import RandomArc from './components/RandomArc';
import Donut from './components/Donut';
import Progress from './components/Progress';

const Spacing = () => <View style={styles.spacing} />;
const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Spacing />
        <Logo />
        <Spacing />
        <Donut />
        <Spacing />
        <Progress />
        <Spacing />
        <RandomArc />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
  },
  spacing: {
    marginTop: 50,
  },
});

export default App;
