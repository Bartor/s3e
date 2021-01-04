import { invert, multiply, perspective } from "./../3d/matrix-operations";
import { CameraSettings, Position3d } from "./model";
import { Mat4 } from "./../3d/model";
import { Object3d } from "./object3d.class";

/**
 * A single camera in a scene.
 */
class Camera extends Object3d {
  private _viewMat: Mat4 = new Float32Array(16);
  public perspectiveMatrix: Mat4;

  constructor(private settings: CameraSettings) {
    super();

    this.updateCameraSettings(settings);
  }

  /**
   * Update the image produced by the camera
   * @param {CameraSettings} settings New settings, all fields are optional and if not provided, will be set to previous value
   */
  public updateCameraSettings({
    viewAngle = this.settings.viewAngle,
    far = this.settings.far,
    near = this.settings.near,
    aspectRatio = this.settings.aspectRatio,
  }: Partial<CameraSettings>) {
    this.perspectiveMatrix = perspective(viewAngle, aspectRatio, near, far);
    this.changed = true;
  }

  public get viewProjection() {
    if (this.changed || this.parent.changed) {
      invert(this.absoluteMatrix, this._viewMat);
      multiply(this.perspectiveMatrix, this._viewMat, this._viewMat);
    }

    return this._viewMat;
  }

  /**
   * Rotates the camera to look at a particular point is space. This actually changes camera's rotation, does not use a "look at" matrix
   * @param {Position3d} position A point to look at
   */
  public lookAt(position: Position3d) {
    this.rotation.x = Math.atan2(
      position.y - this.position.y,
      -(position.z - this.position.z)
    );

    if (position.z - this.position.z >= 0) {
      this.rotation.y = -Math.atan2(
        -(position.x - this.position.x) * Math.cos(this.rotation.x),
        position.z - this.position.z
      );
    } else {
      this.rotation.y = Math.atan2(
        -(position.x - this.position.x) * Math.cos(this.rotation.x),
        -(position.z - this.position.z)
      );
    }

    this.rotation.z =
      Math.atan2(
        Math.cos(this.rotation.x),
        Math.sin(this.rotation.x) * Math.sin(this.rotation.y)
      ) -
      Math.PI / 2;
  }
}

export { Camera };
