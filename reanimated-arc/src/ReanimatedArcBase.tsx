/*
 * implemented on the base of https://github.com/bartgryszko/react-native-circular-progress/blob/master/src/CircularProgress.js
 * but with reanimated
 */

import * as React from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';
import {Svg, Path, G} from 'react-native-svg';
import Reanimated from 'react-native-reanimated';

const {
  add,
  sub,
  multiply,
  divide,
  cos,
  sin,
  lessOrEq,
  cond,
  concat,
  min,
  and,
} = Reanimated;

const AnimatedG = Reanimated.createAnimatedComponent(G);
const AnimatedPath = Reanimated.createAnimatedComponent(Path);

export type Props = {
  diameter: number;
  width: number;
  arcSweepAngle: number | Reanimated.Node<number>;
  rotation: number | Reanimated.Node<number>;
  color: string | Reanimated.Node<number>;
  lineCap: 'round' | 'butt' | 'square';
  hideSmallAngle: boolean;
  style?: StyleProp<ViewStyle>;
};

export const defaultProps = {
  color: 'black',
  rotation: 0,
  lineCap: 'round',
  arcSweepAngle: 360,
  hideSmallAngle: true,
};

export default class AnimatedArc extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  animatedString(
    strings: TemplateStringsArray,
    ...values: Array<number | string | Reanimated.Node<string | number>>
  ) {
    const arr = [];
    const n = values.length;
    for (let i = 0; i < n; i++) {
      arr.push(strings[i], values[i]);
    }
    const end = strings[n];
    if (end) {
      arr.push(end);
    }
    //@ts-ignore
    return concat(...arr);
  }

  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number | Reanimated.Node<number>,
  ) {
    const angleInRadians = divide(
      multiply(sub(angleInDegrees, 90), Math.PI),
      180,
    );
    return {
      x: add(centerX, multiply(radius, cos(angleInRadians))),
      y: add(centerY, multiply(radius, sin(angleInRadians))),
    };
  }

  getCirclePath(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number | Reanimated.Node<number>,
  ) {
    const start = this.polarToCartesian(
      x,
      y,
      radius,
      multiply(endAngle, 0.9999),
    );
    this.arcEndPosition = start;

    const hideSmallAngle = cond(
      and(
        this.props.hideSmallAngle ? 1 : 0,
        lessOrEq(sub(endAngle, startAngle), 1),
      ),
      1,
      0,
    );

    const end = this.polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = cond(
      lessOrEq(sub(endAngle, startAngle), 180),
      '0',
      '1',
    );

    return cond(
      hideSmallAngle,
      //@ts-ignore invalid reanimated types
      '', // empty path to hide arc with angle is less than 1
      this.animatedString`M ${start.x} ${
        start.y
      } A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    );
  }
  outerRadius = this.props.diameter / 2;
  innerRadius = this.props.diameter / 2 - this.props.width / 2;

  arcEndPosition: {
    x: Reanimated.Node<number>;
    y: Reanimated.Node<number>;
  } = {
    x: new Reanimated.Value<number>(0),
    y: new Reanimated.Value<number>(0),
  };

  circlePath = this.getCirclePath(
    this.outerRadius,
    this.outerRadius,
    this.innerRadius,
    0,
    min(this.props.arcSweepAngle, 360),
  );

  rotation = concat(this.props.rotation, 'deg');

  render() {
    const {diameter, width, color, style, lineCap} = this.props;

    const pivot = this.outerRadius;
    return (
      <View style={style}>
        <Svg
          width={diameter}
          height={diameter}
          viewBox={`${-pivot} ${-pivot} ${diameter} ${diameter}`}>
          <AnimatedG
            style={{
              transform: [{rotate: this.rotation}],
            }}>
            <AnimatedPath
              d={this.circlePath}
              stroke={color}
              strokeWidth={width}
              strokeLinecap={lineCap}
              fill="transparent"
              transform={`translate(${-pivot} ${-pivot})`}
            />
          </AnimatedG>
        </Svg>
      </View>
    );
  }
}
