import React, {useState} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {ReanimatedArc} from './ReanimatedArc';
import {Easing} from 'react-native-reanimated';

const targetValues = [100, 130, 70];
const space = 20;
const easing = Easing.inOut(Easing.quad);

const Donut2 = () => {
  const [values, setValues] = useState([0, 0, 0]);
  const setDonutValues = () => setValues(targetValues);
  return (
    <View>
      <ReanimatedArc
        color="#F7AEF8"
        diameter={200}
        width={20}
        arcSweepAngle={values[0]}
        lineCap="round"
        rotation={0}
        initialAnimation={false}
        easing={easing}
        style={{paddingBottom: 20}}
      />
      <ReanimatedArc
        color="#7A85E8"
        diameter={200}
        width={20}
        arcSweepAngle={values[1]}
        lineCap="round"
        rotation={targetValues[0] + space}
        style={styles.absolute}
        initialAnimation={false}
        easing={easing}
      />
      <ReanimatedArc
        color="#50C9CE"
        diameter={200}
        width={20}
        arcSweepAngle={values[2]}
        lineCap="round"
        rotation={targetValues[0] + targetValues[1] + space * 2}
        style={styles.absolute}
        initialAnimation={false}
        easing={easing}
      />
      <Button title="Show donut" onPress={setDonutValues} />
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});

export default Donut2;
