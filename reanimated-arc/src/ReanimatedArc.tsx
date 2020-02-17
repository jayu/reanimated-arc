import * as React from 'react';
import Reanimated, {Easing} from 'react-native-reanimated';
import ReanimatedArcBase, {
  Props as ReanimatedArcBaseProps,
  defaultProps,
} from './ReanimatedArcBase';

type Props = Omit<ReanimatedArcBaseProps, 'arcSweepAngle' | 'rotation'> & {
  arcSweepAngle: number;
  rotation: number;
  initialAnimation: boolean;
  animationDuration: number;
  easing: Reanimated.EasingFunction;
};

class ReanimatedArc extends React.Component<Props> {
  static defaultProps = {
    ...defaultProps,
    initialAnimation: true,
    animationDuration: 800,
    easing: Easing.linear,
  };

  arcSweepAngle = new Reanimated.Value<number>(0);
  rotation = new Reanimated.Value<number>(0);

  arcSweepAngleTiming: Reanimated.BackwardCompatibleWrapper | null = null;
  rotationTiming: Reanimated.BackwardCompatibleWrapper | null = null;

  componentDidMount() {
    const {initialAnimation, arcSweepAngle, rotation} = this.props;

    if (initialAnimation) {
      this.runArcAnimation();
      this.runRotationAnimation();
    } else {
      this.arcSweepAngle.setValue(arcSweepAngle);
      this.rotation.setValue(rotation);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {arcSweepAngle, rotation} = this.props;

    if (arcSweepAngle !== prevProps.arcSweepAngle) {
      this.runArcAnimation();
    }

    if (rotation !== prevProps.rotation) {
      this.runRotationAnimation();
    }
  }

  runArcAnimation() {
    const {arcSweepAngle, animationDuration, easing} = this.props;

    if (this.arcSweepAngleTiming !== null) {
      this.arcSweepAngleTiming.stop();
    }

    this.arcSweepAngleTiming = Reanimated.timing(this.arcSweepAngle, {
      toValue: arcSweepAngle,
      duration: animationDuration,
      easing,
    });

    this.arcSweepAngleTiming.start(() => {
      this.arcSweepAngleTiming = null;
    });
  }

  runRotationAnimation() {
    const {rotation, animationDuration, easing} = this.props;

    if (this.rotationTiming !== null) {
      this.rotationTiming.stop();
    }

    this.rotationTiming = Reanimated.timing(this.rotation, {
      toValue: rotation,
      duration: animationDuration,
      easing,
    });

    this.rotationTiming.start(() => {
      this.rotationTiming = null;
    });
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {diameter, width, color, lineCap, hideSmallAngle, style} = this.props;
    return (
      <ReanimatedArcBase
        arcSweepAngle={this.arcSweepAngle}
        rotation={this.rotation}
        diameter={diameter}
        width={width}
        color={color}
        lineCap={lineCap}
        hideSmallAngle={hideSmallAngle}
        style={style}
      />
    );
  }
}

export default ReanimatedArc;
