import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ReanimatedArcBase} from './ReanimatedArc';
import Reanimated from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const {divide, multiply, diffClamp, interpolate} = Reanimated;
const containerWidth = 200;

class Slider extends React.Component {
  _touchX = new Reanimated.Value(100);
  _onPanGestureEvent = Reanimated.event([{nativeEvent: {x: this._touchX}}], {
    useNativeDriver: true,
  });
  progress = diffClamp(divide(this._touchX, containerWidth), 0, 1);
  arcAngle = multiply(this.progress, 150);
  barOpacity = interpolate(this.progress, {
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });
  render() {
    return (
      <View>
        <View style={styles.container}>
          <ReanimatedArcBase
            color="lightgrey"
            diameter={containerWidth}
            width={15}
            arcSweepAngle={150}
            lineCap="round"
            rotation={285}
            style={styles.absolute}
          />
          <Reanimated.View
            style={[styles.absolute, {opacity: this.barOpacity}]}>
            <ReanimatedArcBase
              color="yellow"
              diameter={containerWidth}
              width={15}
              arcSweepAngle={this.arcAngle}
              lineCap="round"
              rotation={285}
            />
          </Reanimated.View>
          <View style={[styles.absolute, {alignSelf: 'flex-start'}]}>
            <PanGestureHandler onGestureEvent={this._onPanGestureEvent}>
              <Reanimated.View
                style={{
                  width: containerWidth - 10,
                  height: 160,
                }}
              />
            </PanGestureHandler>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    width: 200,
    height: 90,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
  },
});

export default Slider;
