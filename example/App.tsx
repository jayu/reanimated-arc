import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ReanimatedArc from 'reanimated-arc';
import Reanimated, {Easing} from 'react-native-reanimated';

const start = 0;
const end = 180;

const App = () => {
  const arcAngle = useRef(new Reanimated.Value(start));
  const [toValue, setToValue] = useState(end);
  const animate = () =>
    Reanimated.timing(arcAngle.current, {
      toValue: toValue,
      easing: Easing.inOut(Easing.quad),
      duration: 800,
    }).start(() => {
      setToValue(toValue === start ? end : start);
    });
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ReanimatedArc
          color="coral"
          diameter={350}
          lineWidth={30}
          arcSweepAngle={arcAngle.current}
          lineCap="butt"
          rotation={Reanimated.concat(
            Reanimated.divide(arcAngle.current, 2),
            'deg',
          )}
        />
        <Button title="Animate!" onPress={animate} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
