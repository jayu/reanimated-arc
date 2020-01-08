<h1 align="center">
  Reanimated Arc
</h1>

## About

`reanimated-arc` is an animated Arc component implemented with `react-native-reanimated`. It can be used to create circular progress bars, donut charts, and many more... all with native performance.

## Examples

**GIF HERE**

Example app lives in [example](/example) directory

## Getting started

### Installation

```sh
yarn add reanimated-arc
```

### Usage or `ReanimatedArcBase`

```tsx
import React, {useRef} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {ReanimatedArcBase} from 'reanimated-arc';
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
        width={30}
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
```

## ReanimatedArcBase

### Notes

Please note that if `arcSweepAngle`, `rotation` or `color` would be primitive value (not Reanimated node), property would not be animated.
We are planning to implement a separate wrapper component that will handle animations of primitive values of props on `componentDidUpdate`.

### Properties

| property       | type                               | description                                   | notes                                                                                                                                                                        | default      |
| -------------- | ---------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **diameter**   | `number`                           | Diameter of the arc                           |                                                                                                                                                                              | **required** |
| **width**      | `number`                           | Width of the arc stroke                       |                                                                                                                                                                              | **required** |
| arcSweepAngle  | `number | Reanimated.Node<number>` | Angle defining part of the circle to be shown |                                                                                                                                                                              | `360`        |
| rotation       | `string | Reanimated.Node<string>` | Rotation of the arc                           |                                                                                                                                                                              | `'0deg'`     |
| color          | `string | Reanimated.Node<string>` | Color of the arc                              | Animating color is buggy on **android**. We used `Reanimated.concat` to compose `rgb` color. `Reanimated.color` is not yet supported by `react-native-svg`                   | `'black'`    |
| lineCap        | `'round' | 'butt' | 'square'`      | Line ending style                             | For some reason on **android** angles with value of `90` `180` and `270` with `round` cap appears without rounded end. Using `90.1` `180.1` `270.1` is a workaround for now. | `'round'`    |
| hideSmallAngle | `boolean`                          | Wether to hide arc for angles less than 1     | When `lineCap="round"` is used, arc of angle `1` is a dot, which is visually bigger than 1 deg                                                                               | `true`       |
| style          | `StyleProp<ViewStyle>`             | Additional styles of the container            |                                                                                                                                                                              | `undefined`  |

## This is a monorepo

Contents of actual library can be found in [reanimated-arc](/reanimated-arc) subdirectory

Example app lives in [example](/example) directory

## Development

Library has a great development experience. Follow these steps to set up environment:

1. Run `yarn` in root directory to install dependencies
1. Run `yarn --cwd reanimated-arc build:watch` to start building library in watch mode
1. Run `yarn --cwd example start` to start packager. It is required to start packager separately because otherwise it has incorrect working directory.
1. Run `yarn --cwd example android` or `yarn --cwd example ios` to start example app

## Special Thanks

Special thanks to [Lenus eHealth](https://www.lenusehealth.com/) for their openness to sharing solutions, that was created during the project time, with the open-source community.

Library was inspired by `https://github.com/bartgryszko/react-native-circular-progress` and some math behind generating arc was taken directly from that repo. Also big thanks for the authors.
