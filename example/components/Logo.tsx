import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Reanimated, {Easing} from 'react-native-reanimated';

import {ReanimatedArcBase} from './ReanimatedArc';

const App = () => {
  const arcAngle = useRef(new Reanimated.Value(-90));

  const animate = () =>
    Reanimated.timing(arcAngle.current, {
      toValue: 270,
      easing: Easing.inOut(Easing.quad),
      duration: 2000,
    }).start();

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ReanimatedArcBase
        color="#121330"
        diameter={200}
        width={20}
        lineCap="round"
        arcSweepAngle={160}
        rotation={Reanimated.add(arcAngle.current, 10)}
        style={styles.arc1}
      />
      <ReanimatedArcBase
        color="#3eefd8"
        diameter={140}
        width={20}
        lineCap="round"
        arcSweepAngle={170}
        rotation={Reanimated.multiply(
          Reanimated.sub(arcAngle.current, 185),
          -1,
        )}
        style={styles.arc2}
      />
      <ReanimatedArcBase
        color="#121330"
        diameter={80}
        width={20}
        lineCap="round"
        arcSweepAngle={180.1}
        rotation={arcAngle.current}
        style={styles.arc3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 200,
    height: 200,
  },
  arc1: {
    position: 'absolute',
  },
  arc2: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
  arc3: {
    position: 'absolute',
    left: 60,
    top: 60,
  },
});

export default App;
