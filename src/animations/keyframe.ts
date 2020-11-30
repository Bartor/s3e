export const KeyframeType = {
  HOLD: (_: number) => 0,
  LINEAR: (value: number) => value,
  SQUARE_IN: (value: number) => value ** 2,
  SQUARE_OUT: (value: number) => 2 * value - value ** 2,
  SQUARE_IN_OUT: (value: number) =>
    value < 0.5 ? 2 * value ** 2 : -2 * value ** 2 + 4 * value - 1,
};

export interface Keyframe<T> {
  frame: number;
  value: T;
  interpolation: InterpolationFunction;
}
