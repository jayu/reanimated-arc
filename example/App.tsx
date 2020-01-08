import React, {useRef} from 'react';
import {SafeAreaView, Button} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {ReanimatedArcBase} from 'reanimated-arc'; // It's intentionally not listed in package.json to make it easier to develop with example app. Import is mapped in tsconfig.
import Reanimated, {Easing} from 'react-native-reanimated';

const App = () => {
  const arcAngle = useRef(new Reanimated.Value(50));
  const animate = () =>
    Reanimated.timing(arcAngle.current, {
      toValue: Math.random() * 360,
      easing: Easing.inOut(Easing.quad),
      duration: 800,
    }).start();
  return (
    <SafeAreaView>
      <ReanimatedArcBase
        color="coral"
        diameter={200}
        width={20}
        arcSweepAngle={arcAngle.current}
        lineCap="round"
        rotation={Reanimated.concat(
          Reanimated.divide(arcAngle.current, 2),
          'deg',
        )}
      />
      <Button title="Animate Arc!" onPress={animate} />
    </SafeAreaView>
  );
};

export default App;
