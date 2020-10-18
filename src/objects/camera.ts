import { invert, multiply, perspective } from "./../3d/matrix-operations";
import { CameraSettings } from "./model";
import { Mat4 } from "./../3d/model";
import ChangeableObject from "./abstracts/changeable-object.abstract.class";

export class Camera extends ChangeableObject {
  private viewMatrix: Mat4 = new Float32Array(16);
  private viewProjectionMatrix: Mat4 = new Float32Array(16);
  private projectionMatrix: Mat4;

  constructor(settings: CameraSettings) {
    super();

    this.updateCameraSettings(settings);
  }

  public updateCameraSettings({
    viewAngle,
    far,
    near,
    aspectRatio,
  }: CameraSettings) {
    this.projectionMatrix = perspective(viewAngle, aspectRatio, near, far);
    invert(this.selfMatrix, this.viewMatrix);
    multiply(this.projectionMatrix, this.viewMatrix, this.viewProjectionMatrix);
  }
}
