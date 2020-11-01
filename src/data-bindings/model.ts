export interface DataSignature {
  type: string;
  location: number | WebGLUniformLocation;
}

export type DataUpdateCall<T> = (newValue: T, inverse?: boolean) => void;

export type DataBindings<T> = Map<string, DataUpdateCall<T>>;

// Performance Critical
export type DataBindingValue = [
  name: string,
  value: number | Float32Array | WebGLBuffer
];

export type DataBindingsValueUpdate = {
  attributes?: DataBindingValue[];
  uniforms?: DataBindingValue[];
};

export type Binded = [name: string, type: string];
