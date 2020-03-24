import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Logo from './components/Logo';
import RandomArc from './components/RandomArc';
import Donut from './components/Donut';
import Donut2 from './components/Donut2';
import Progress from './components/Progress';
import Stopwatch from './components/Stopwatch';
import Slider from './components/Slider';

const Spacing = () => <View style={styles.spacing} />;
const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Spacing />
        <Logo />
        <Spacing />
        <Donut2 />
        <Spacing />
        <Donut />
        <Spacing />
        <Progress />
        <Spacing />
        <Stopwatch />
        <Spacing />
        <RandomArc />
        <Spacing />
        <Slider />
        <Spacing />
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
