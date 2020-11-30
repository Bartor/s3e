type ValueChangeCallback<T> = (progress: number, previous: T, next: T) => void;

type InterpolationFunction = (value: number) => number;
