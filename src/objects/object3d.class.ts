import { createGetters } from "./util/create-getters";
import { copy, invert, transpose } from "./../3d/matrix-operations";
import { identity, multiply, scale } from "../3d/matrix-operations";
import { move, rotateX, rotateY, rotateZ } from "../3d/matrix-operations";
import { Mat4 } from "../3d/model";
import { Position3d, Rotation3d, Scale3d } from "./model";
import { Scene } from "../se3-engine/scene";
import { ObjectRepresentation } from "../se3-engine/model";

/**
 * A base class for all objects in the scene. Holds all logic related to matrix calculations and physical parameters of the object in a scene.
 */
class Object3d {
  constructor(
    public representation: ObjectRepresentation = {
      defaultScale: { x: 1, y: 1, z: 1 },
      featuresMask: 0,
      bufferData: {
        positions: null,
      },
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
    if (this.scene) {
      this.scene.connectScene(child);
    }
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
      if (this.representation.defaultScale !== undefined) {
        scale(
          this.absoluteMatrix,
          this.representation.defaultScale.x,
          this.representation.defaultScale.y,
          this.representation.defaultScale.z,
          this._norMat
        );
        invert(this._norMat, this._norMat);
      } else {
        invert(this.absoluteMatrix, this._norMat);
      }
      transpose(this._norMat, this._norMat);
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

  public get position() {
    return this.positionGetters;
  }

  public set position(newPosition: Partial<Position3d>) {
    this.position.x = newPosition.x ?? this.position.x;
    this.position.y = newPosition.y ?? this.position.y;
    this.position.z = newPosition.z ?? this.position.z;
  }

  private positionGetters: Position3d = createGetters(this, this._pos);

  public get rotation() {
    return this.rotationGetters;
  }

  public set rotation(newRotation: Partial<Rotation3d>) {
    this.rotation.x = newRotation.x ?? this.rotation.x;
    this.rotation.y = newRotation.y ?? this.rotation.y;
    this.rotation.z = newRotation.z ?? this.rotation.z;
  }

  private rotationGetters: Rotation3d = createGetters(this, this._rot);

  public get scale() {
    return this.scaleGetters;
  }

  public set scale(newScale: Partial<Scale3d>) {
    this.scale.x = newScale.x ?? this.scale.x;
    this.scale.y = newScale.y ?? this.scale.y;
    this.scale.z = newScale.z ?? this.scale.z;
  }

  private scaleGetters: Scale3d = createGetters(this, this._sca);
}

export { Object3d };
