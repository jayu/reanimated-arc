<p align="center">
  <img height="32" src="assets/reanimated-arc.png">
  <img width="32" height="32" src="assets/arc-logo.gif?raw=true">
</p>

<p align="center">
  Animated Arc for building circular progress bars and donut charts with native performance!
</p>

---

[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

[![PRs Welcome][prs-welcome-badge]][prs-welcome]
[![Code of Conduct][coc-badge]][coc]
[![Sponsored by Callstack][callstack-badge]][callstack]

## Installation

Install `@callstack/reanimated-arc`

```sh
yarn add @callstack/reanimated-arc
```

Install `react-native-svg` peer dependency

```sh
yarn add react-native-svg@^10.0.0
```

> Library supports `react-native-svg` in versions from `9.13.4` to last of `10.0.0`. It seems to not work well on Android with `11` and above

Install `react-native-reanimated` peer dependency

```sh
yarn add react-native-reanimated
```

## Examples

<img src="assets/arc-example.gif?raw=true" width="300">

Example app lives in [example](/example) directory

## Usage

### With animations working out-of-the-box using `ReanimatedArc`

```tsx
import React, {useState, useCallback} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {ReanimatedArc} from '@callstack/reanimated-arc';

const App = () => {
  const [arc, setArc] = useState(50);
  const animate = useCallback(() => {
    setArc(Math.random() * 360);
  }, []);

  return (
    <SafeAreaView>
      <ReanimatedArc
        color="coral"
        diameter={200}
        width={30}
        arcSweepAngle={arc}
        lineCap="round"
        rotation={arc / 2}
      />
      <Button title="Animate Arc!" onPress={animate} />
    </SafeAreaView>
  );
};

export default App;
```

### With full control over the animations using `ReanimatedArcBase`

```tsx
import React, {useRef, useCallback} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {ReanimatedArcBase} from '@callstack/reanimated-arc';
import Reanimated, {Easing} from 'react-native-reanimated';

const App = () => {
  const arcAngle = useRef(new Reanimated.Value(50));
  const animate = useCallback(
    () =>
      Reanimated.timing(arcAngle.current, {
        toValue: Math.random() * 360,
        easing: Easing.inOut(Easing.quad),
        duration: 800,
      }).start(),
    [],
  );
  return (
    <SafeAreaView>
      <ReanimatedArcBase
        color="coral"
        diameter={200}
        width={30}
        arcSweepAngle={arcAngle.current}
        lineCap="round"
        rotation={Reanimated.divide(arcAngle.current, 2)}
      />
      <Button title="Animate Arc!" onPress={animate} />
    </SafeAreaView>
  );
};

export default App;
```

## ReanimatedArc

`ReanimatedArc` component will automatically animate changes of `arcSweepAngle` and `rotation` props. It do not accept reanimated nodes as values for those props.

### Properties

| property          | type                            | description                                   | default         |
| ----------------- | ------------------------------- | --------------------------------------------- | --------------- |
| **diameter**      | `number`                        | Diameter of the arc                           | **required**    |
| **width**         | `number`                        | Width of the arc stroke                       | **required**    |
| initialAnimation  | `boolean`                       | Whether to perform initial arc animation      | true            |
| animationDuration | `number`                        | Animation duration in milliseconds            | `800`           |
| easing            | `Reanimated.EasingFunction`     | Animation easing function                     | `Easing.linear` |
| arcSweepAngle     | `number`                        | Angle defining part of the circle to be shown | `360`           |
| rotation          | `number`                        | Rotation of the arc in degrees                | `0`             |
| color             | `string`                        | Color of the arc                              | `'black'`       |
| lineCap           | `'round' \| 'butt' \| 'square'` | Line ending style                             | `'round'`       |
| hideSmallAngle    | `boolean`                       | Wether to hide arc for angles less than 1     | `true`          |
| style             | `StyleProp<ViewStyle>`          | Additional styles of the container            | `undefined`     |

## ReanimatedArcBase

This component provides ability to control arc by reanimated values or nodes.

### Properties

| property       | type                                | description                                   | default      |
| -------------- | ----------------------------------- | --------------------------------------------- | ------------ |
| **diameter**   | `number`                            | Diameter of the arc                           | **required** |
| **width**      | `number`                            | Width of the arc stroke                       | **required** |
| arcSweepAngle  | `number \| Reanimated.Node<number>` | Angle defining part of the circle to be shown | `360`        |
| rotation       | `number \| Reanimated.Node<number>` | Rotation of the arc in degrees                | `0`          |
| color          | `string \| Reanimated.Node<string>` | Color of the arc                              | `'black'`    |
| lineCap        | `'round' \| 'butt' \| 'square'`     | Line ending style                             | `'round'`    |
| hideSmallAngle | `boolean`                           | Wether to hide arc for angles less than 1     | `true`       |
| style          | `StyleProp<ViewStyle>`              | Additional styles of the container            | `undefined`  |

### Notes

Please note that if `arcSweepAngle`, `rotation` or `color` would be primitive value (not Reanimated node), property would not be animated.
If you want to have those values automatically animated please use [`ReanimatedArc` component](#ReanimatedArc)

| property       | notes                                                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color          | Animating color is buggy on **android**. We used `Reanimated.concat` to compose `rgb` color. `Reanimated.color` is not yet supported by `react-native-svg`                   |
| lineCap        | For some reason on **android** angles with value of `90` `180` and `270` with `round` cap appears without rounded end. Using `90.1` `180.1` `270.1` is a workaround for now. |
| hideSmallAngle | When `lineCap="round"` is used, arc of angle `1` is a dot, which is visually bigger than 1 deg. Prop can be used as a workaround for this issue.                             |

## Caveats

It's likely that library will have performance dropdown in some specific cases, especially on **android**. See [Donut example](/example/components/Donut.tsx) as a reference.

## This is a monorepo

Contents of actual library can be found in [reanimated-arc](/reanimated-arc) subdirectory

Example app lives in [example](/example) directory

## Development

Library has a great development experience. Follow these steps to set up environment:

1. Run `yarn` in root directory to install dependencies
1. Run `yarn --cwd reanimated-arc build:watch` to start building library in watch mode
1. Run `yarn --cwd example start` to start packager. It is required to start packager separately because otherwise it has incorrect working directory.
1. Run `yarn --cwd example android` or `yarn --cwd example ios` to start example app

## Made with ❤️ at Callstack

Reanimated Arc is an open source project and will always remain free to use. If you think it's cool, please star it 🌟. [Callstack](https://callstack.com) is a group of React and React Native geeks, contact us at [hello@callstack.com](mailto:hello@callstack.com) if you need any help with these or just want to say hi!

## Special Thanks

Special thanks to [Lenus eHealth](https://www.lenusehealth.com/) for their openness to sharing solutions, that were created during the project time, with the open-source community.

Library was inspired by [`react-native-circular-progress`](https://github.com/bartgryszko/react-native-circular-progress) and some math behind generating arc was taken directly from that repo. Also big thanks for the authors.

<!-- badges -->

[version-badge]: https://img.shields.io/npm/v/@callstack/reanimated-arc.svg?style=flat-square
[package]: https://www.npmjs.com/package/@callstack/reanimated-arc
[license-badge]: https://img.shields.io/npm/l/@callstack/reanimated-arc.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[prs-welcome-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs-welcome]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/callstack/reanimated-arc/blob/master/CODE_OF_CONDUCT.md
[all-contributors-badge]: https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square
[callstack-badge]: https://callstack.com/images/callstack-badge.svg
[callstack]: https://callstack.com/open-source/?utm_source=github.com&utm_medium=referral&utm_campaign=rnbrownfield&utm_term=readme
