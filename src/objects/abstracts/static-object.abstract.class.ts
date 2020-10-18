import { identity, multiply } from "./../../3d/matrix-operations";
import { Mat4 } from "./../../3d/model";
import { Object3d, Position3d, Rotation3d } from "./../model";

abstract class StaticObject implements Object3d {
  public changed = false;

  public children: StaticObject[] = [];
  public parent: Object3d;

  constructor(
    public readonly position: Position3d,
    public readonly rotation: Rotation3d
  ) {}

  public selfMatrix: Mat4 = identity();
  private _absMat: Mat4 = identity();

  public get absoluteMatrix() {
    if (this.parent.changed) {
      multiply(this.selfMatrix, this.parent.selfMatrix, this._absMat);
    }

    return this._absMat;
  }
}

export default StaticObject;
