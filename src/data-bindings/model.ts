export interface DataSignature {
  type: string;
  location: number | WebGLUniformLocation;
}

export type DataUpdateCall<T> = (newValue: T, inverse?: boolean) => void;

export type DataBindings<T> = Map<string, DataUpdateCall<T>>;

// Performance Critical
export type DataBindingValue = [string, number | Float32Array];

export type DataBindingsValueUpdate = {
  attributes?: DataBindingValue[];
  uniforms?: DataBindingValue[];
};
