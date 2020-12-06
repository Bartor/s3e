import { Vec3 } from "../model";
import { Object3d } from "../object3d.class";

export const createGetters = (object: Object3d, property: Vec3<number>) =>
  Object.defineProperties(
    {},
    {
      x: {
        get: () => property.x,
        set: (value: number) => {
          property.x = value;
          object.changed = true;
        },
      },
      y: {
        get: () => property.y,
        set: (value: number) => {
          property.y = value;
          object.changed = true;
        },
      },
      z: {
        get: () => property.z,
        set: (value: number) => {
          property.z = value;
          object.changed = true;
        },
      },
    }
  );
