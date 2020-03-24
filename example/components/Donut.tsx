import React, {useState} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {ReanimatedArc} from './ReanimatedArc';

const generateValues = () => {
  const initialRotation = Math.random() * 120 - 60;
  const spaceBetweenArcs = 20;
  const firstSecondRatio = Math.random() * 75;
  const first = {
    arc: Math.random() * 50 + firstSecondRatio,
    rotation: initialRotation,
  };
  const second = {
    arc: Math.random() * 50 + (150 - firstSecondRatio),
    rotation: first.rotation + first.arc + spaceBetweenArcs,
  };
  const third = {
    arc: 360 - second.arc - first.arc - 3 * spaceBetweenArcs,
    rotation: second.rotation + second.arc + spaceBetweenArcs,
  };
  return [first, second, third];
};

const Donut = () => {
  const [values, setValues] = useState(generateValues());
  const setNewDonut = () => setValues(generateValues());
  return (
    <View>
      <ReanimatedArc
        color="#8EA604"
        diameter={200}
        width={20}
        arcSweepAngle={values[0].arc}
        lineCap="round"
        rotation={values[0].rotation}
        initialAnimation={false}
        style={{paddingBottom: 20}}
      />
      <ReanimatedArc
        color="#FB6107"
        diameter={200}
        width={20}
        arcSweepAngle={values[1].arc}
        lineCap="round"
        rotation={values[1].rotation}
        style={styles.absolute}
        initialAnimation={false}
      />
      <ReanimatedArc
        color="#FEC601"
        diameter={200}
        width={20}
        arcSweepAngle={values[2].arc}
        lineCap="round"
        rotation={values[2].rotation}
        style={styles.absolute}
        initialAnimation={false}
      />
      <Button title="Animate Arc!" onPress={setNewDonut} />
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});

export default Donut;
