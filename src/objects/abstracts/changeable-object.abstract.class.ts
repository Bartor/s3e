import { identity, multiply } from "./../../3d/matrix-operations";
import { Object3d } from "../model";
import { move, rotateX, rotateY, rotateZ } from "../../3d/matrix-operations";
import { Mat4 } from "../../3d/model";
import { Position3d, Rotation3d } from "../model";

abstract class ChangeableObject implements Object3d {
  public changed = false;

  private _pos: Rotation3d = { x: 0, y: 0, z: 0 };
  private _rot: Rotation3d = { x: 0, y: 0, z: 0 };

  private _absMat: Mat4 = identity();

  public children: Object3d[] = [];
  public parent: Object3d;

  public selfMatrix: Mat4 = identity();

  public get absoluteMatrix() {
    if (this.changed) {
      this.selfMatrix = identity();

      if (this._pos.x || this._pos.y || this._pos.z)
        move(
          this.selfMatrix,
          this._pos.x,
          this._pos.y,
          this._pos.z,
          this.selfMatrix
        );

      if (this._rot.x) rotateX(this.selfMatrix, this._rot.x, this.selfMatrix);
      if (this._rot.y) rotateY(this.selfMatrix, this._rot.y, this.selfMatrix);
      if (this._rot.z) rotateZ(this.selfMatrix, this._rot.z, this.selfMatrix);

      multiply(this.selfMatrix, this.parent.selfMatrix, this._absMat);
    } else if (this.parent.changed) {
      multiply(this.selfMatrix, this.parent.selfMatrix, this._absMat);
    }

    return this._absMat;
  }

  public readonly position: Position3d = Object.defineProperties(
    {},
    {
      x: {
        get: () => this._pos.x,
        set: (value: number) => {
          this._pos.x = value;
          this.changed = true;
        },
      },
      y: {
        get: () => this._pos.y,
        set: (value: number) => {
          this._pos.y = value;
          this.changed = true;
        },
      },
      z: {
        get: () => this._pos.z,
        set: (value: number) => {
          this._pos.z = value;
          this.changed = true;
        },
      },
    }
  );

  public readonly rotation: Rotation3d = Object.defineProperties(
    {},
    {
      x: {
        get: () => this._rot.x,
        set: (value: number) => {
          this._rot.x = value;
          this.changed = true;
        },
      },
      y: {
        get: () => this._pos.y,
        set: (value: number) => {
          this._rot.y = value;
          this.changed = true;
        },
      },
      z: {
        get: () => this._pos.z,
        set: (value: number) => {
          this._rot.z = value;
          this.changed = true;
        },
      },
    }
  );
}

export default ChangeableObject;
