import React, {useRef, useEffect} from 'react';
import {Button, View} from 'react-native';
import {ReanimatedArcBase} from './ReanimatedArc';
import Reanimated, {Easing} from 'react-native-reanimated';

const RandomArc = () => {
  const arcAngle = useRef(new Reanimated.Value(Math.random() * 360));
  const animate = () =>
    Reanimated.timing(arcAngle.current, {
      toValue: Math.random() * 360,
      easing: Easing.inOut(Easing.quad),
      duration: 1000,
    }).start();

  useEffect(() => {
    setTimeout(() => {
      animate();
    }, 2000);
    setTimeout(() => {
      animate();
    }, 3000);
  }, []);
  return (
    <>
      <ReanimatedArcBase
        color="coral"
        diameter={200}
        width={20}
        arcSweepAngle={arcAngle.current}
        lineCap="round"
        rotation={Reanimated.divide(arcAngle.current, 2)}
      />
      <View style={{paddingTop: 20}}>
        <Button title="Animate Arc!" onPress={animate} />
      </View>
    </>
  );
};

export default RandomArc;
