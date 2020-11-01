import { invert, multiply, perspective } from "./../3d/matrix-operations";
import { CameraSettings } from "./model";
import { Mat4 } from "./../3d/model";
import { Object3d } from "./object3d.class";

class Camera extends Object3d {
  private viewMatrix: Mat4 = new Float32Array(16);
  public perspectiveMatrix: Mat4;

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
    this.perspectiveMatrix = perspective(viewAngle, aspectRatio, near, far);
    this.changed = true;
  }

  public get cameraMatrix() {
    if (this.changed) {
      invert(this.selfMatrix, this.viewMatrix);
    }

    return this.viewMatrix;
  }
}

export { Camera };
