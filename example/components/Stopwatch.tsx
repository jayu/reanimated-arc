import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {ReanimatedArc} from './ReanimatedArc';
import {Easing} from 'react-native-reanimated';

const easing = Easing.inOut(Easing.quad);
const Stopwatch = () => {
  const [currentTime, setCurrentTime] = useState(30);
  const [currentTimeText, setCurrentTimeText] = useState('00:30');
  const [stopWatchActive, setStopWatchActive] = useState(false);

  useEffect(() => {
    if (stopWatchActive) {
      const timeout1 = setTimeout(() => {
        if (currentTime < 1) {
          setStopWatchActive(false);
        } else {
          setCurrentTime(currentTime - 1);
        }
      }, 1000);
      const timeout2 = setTimeout(() => {
        setCurrentTimeText(`00:${currentTime < 10 ? '0' : ''}${currentTime}`);
      }, 150);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [currentTime, stopWatchActive]);

  const startCounting = () => {
    setCurrentTime(30);
    setStopWatchActive(true);
  };

  return (
    <View>
      <View style={[styles.container]}>
        <ReanimatedArc
          color="lightgrey"
          diameter={195}
          width={10}
          arcSweepAngle={360}
          lineCap="round"
          initialAnimation={false}
        />
        <ReanimatedArc
          color="#8EA604"
          diameter={200}
          width={16}
          arcSweepAngle={currentTime * 6}
          animationDuration={200}
          easing={easing}
          lineCap="round"
          style={styles.absolute}
          initialAnimation={false}
        />
        <Text style={[styles.absolute, styles.time]}>{currentTimeText}</Text>
      </View>
      <View style={{paddingTop: 20}}>
        <Button title="Start stopwatch" onPress={startCounting} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
  },
  time: {
    fontSize: 40,
  },
});

export default Stopwatch;
