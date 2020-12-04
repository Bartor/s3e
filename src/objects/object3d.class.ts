import { invert, transpose } from "./../3d/matrix-operations";
import { PolygonRepresentation } from "./model";
import { identity, multiply, scale } from "../3d/matrix-operations";
import { move, rotateX, rotateY, rotateZ } from "../3d/matrix-operations";
import { Mat4 } from "../3d/model";
import { Position3d, Rotation3d, Scale3d } from "./model";
import { Scene } from "../se3-engine/scene";

class Object3d {
  constructor(
    public representation: PolygonRepresentation = {
      pointsPerFace: 0,
      pointsArray: new Float32Array(),
      normalsArray: new Float32Array(),
    }
  ) {}

  private _pos: Position3d = { x: 0, y: 0, z: 0 };
  private _rot: Rotation3d = { x: 0, y: 0, z: 0 };
  private _sca: Scale3d = { x: 1, y: 1, z: 1 };

  protected _absMat: Mat4 = identity();
  protected _norMat: Mat4 = identity();

  public changed = false;
  public updatedByChild = true;

  public children: Object3d[] = [];
  public parent: Object3d;
  public scene: Scene;

  public updateParent(parent: Object3d) {
    this.parent = parent;
    multiply(this._absMat, this.parent._absMat, this._absMat);
  }

  public addChild(child: Object3d) {
    child.updateParent(this);
    this.children.push(child);
  }

  public removeChild(child: Object3d) {
    const idx = this.children.indexOf(child);

    if (idx !== -1) {
      this.scene.disconnectScene(this.children[idx]);
      this.children.splice(idx, 1);
    }
  }

  public get normalMatrix() {
    if (this.changed || this.parent.changed) {
      this._norMat = invert(this.absoluteMatrix, this._norMat);
      this._norMat = transpose(this._norMat, this._norMat);
    }

    return this._norMat;
  }

  public get absoluteMatrix() {
    if (this.changed || this.parent.changed) {
      identity(this._absMat);

      if (this._pos.x || this._pos.y || this._pos.z)
        move(this._absMat, this._pos.x, this._pos.y, this._pos.z, this._absMat);

      if (this._rot.x) rotateX(this._absMat, this._rot.x, this._absMat);
      if (this._rot.y) rotateY(this._absMat, this._rot.y, this._absMat);
      if (this._rot.z) rotateZ(this._absMat, this._rot.z, this._absMat);

      if (this._sca.x !== 1 || this._sca.y !== 1 || this._sca.z !== 1)
        scale(
          this._absMat,
          this._sca.x,
          this._sca.y,
          this._sca.z,
          this._absMat
        );

      if (this.parent.changed && !this.parent.updatedByChild) {
        multiply(this.parent.absoluteMatrix, this._absMat, this._absMat);
        this.parent.updatedByChild = true;
      } else {
        multiply(this.parent._absMat, this._absMat, this._absMat);
      }
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
          this.updatedByChild = false;
        },
      },
      y: {
        get: () => this._pos.y,
        set: (value: number) => {
          this._pos.y = value;
          this.changed = true;
          this.updatedByChild = false;
        },
      },
      z: {
        get: () => this._pos.z,
        set: (value: number) => {
          this._pos.z = value;
          this.changed = true;
          this.updatedByChild = false;
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
        get: () => this._rot.y,
        set: (value: number) => {
          this._rot.y = value;
          this.changed = true;
        },
      },
      z: {
        get: () => this._rot.z,
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

export { Object3d };
