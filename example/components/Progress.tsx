import React, {useRef, useCallback, useState} from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {ReanimatedArcBase} from './ReanimatedArc';
import Reanimated, {Easing} from 'react-native-reanimated';

const Progress = () => {
  const arcAngle = useRef(new Reanimated.Value(Math.random() * 240));
  const [text, setText] = useState('0%');
  const randomizeProgress = useCallback(() => {
    Reanimated.timing(arcAngle.current, {
      toValue: Math.random() * 240,
      easing: Easing.inOut(Easing.quad),
      duration: 1000,
    }).start();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Reanimated.Code
          exec={Reanimated.call([arcAngle.current], ([value]) => {
            setText(`${Math.round((value / 240) * 100)}%`);
          })}
        />
        <ReanimatedArcBase
          color="lightgrey"
          diameter={200}
          width={20}
          arcSweepAngle={240}
          lineCap="round"
          rotation={240}
          style={styles.absolute}
        />
        <ReanimatedArcBase
          color="purple"
          diameter={200}
          width={20}
          arcSweepAngle={arcAngle.current}
          lineCap="round"
          rotation={240}
          style={styles.absolute}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
      <Button title="Randomize progress" onPress={randomizeProgress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  absolute: {
    position: 'absolute',
  },
  text: {
    transform: [{translateY: -10}],
    fontSize: 40,
  },
});
export default Progress;
