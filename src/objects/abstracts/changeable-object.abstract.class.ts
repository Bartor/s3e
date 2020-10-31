import { PolygonRepresentation } from "./../model";
import { identity, multiply, scale } from "./../../3d/matrix-operations";
import { move, rotateX, rotateY, rotateZ } from "../../3d/matrix-operations";
import { Mat4 } from "../../3d/model";
import { Position3d, Rotation3d, Scale3d, Object3d } from "../model";

abstract class ChangeableObject implements Object3d {
  constructor(
    public representation: PolygonRepresentation = {
      pointsPerFace: 0,
      pointsArray: new Float32Array(),
    }
  ) {}

  private _pos: Position3d = { x: 0, y: 0, z: 0 };
  private _rot: Rotation3d = { x: 0, y: 0, z: 0 };
  private _sca: Scale3d = { x: 1, y: 1, z: 1 };

  private _absMat: Mat4 = identity();

  public changed = false;

  public children: Object3d[] = [];
  public parent: Object3d;

  public updateParent(parent: Object3d) {
    this.parent = parent;
    multiply(this.selfMatrix, this.parent.selfMatrix, this._absMat);
  }

  public addChild(child: Object3d) {
    child.updateParent(this);
    this.children.push(child);
  }

  public selfMatrix: Mat4 = identity();

  public get absoluteMatrix() {
    if (this.changed) {
      this.selfMatrix = identity();

      if (this._sca.x !== 1 || this._sca.y !== 1 || this._sca.z !== 1)
        scale(
          this.selfMatrix,
          this._sca.x,
          this._sca.y,
          this._sca.z,
          this.selfMatrix
        );

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

  public readonly scale: Scale3d = Object.defineProperties(
    {},
    {
      x: {
        get: () => this._sca.x,
        set: (value: number) => {
          this._sca.x = value;
          this.changed = true;
        },
      },
      y: {
        get: () => this._sca.y,
        set: (value: number) => {
          this._sca.y = value;
          this.changed = true;
        },
      },
      z: {
        get: () => this._sca.z,
        set: (value: number) => {
          this._sca.z = value;
          this.changed = true;
        },
      },
    }
  );
}

export { ChangeableObject };
