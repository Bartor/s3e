import { normalize } from "./../3d/matrix-operations";
import { Vec3 } from "./../3d/model";
import { Camera } from "../objects/camera";
import { Object3d } from "../objects/object3d.class";
import { SceneObject } from "./model";
import { S3e } from "./engine";

class Scene extends Object3d {
  public elements: SceneObject[] = [];

  private _camera: Camera;

  public ambientLightLevel: number = 0.5;
  private _lightDirection: Vec3 = normalize([-0.5, 0.2, 0.8]);

  constructor(private engine: S3e, camera: Camera) {
    super();

    this.addChild(camera);
    this.currentCamera = camera;
  }

  public get currentCamera() {
    return this._camera;
  }

  public set currentCamera(camera: Camera) {
    this.connectScene(camera);
    this._camera = camera;
    camera.changed = true;
  }

  public set lightDirection(newDirection: Vec3) {
    normalize(newDirection, this._lightDirection);
  }

  public get lightDirection() {
    return this._lightDirection;
  }

  public connectScene(child: Object3d) {
    if (this.elements.find((element) => element.object === child)) return;

    child.scene = this;

    this.elements.push({
      drawable: !(child instanceof Camera),
      object: child,
    });

    /**
     * Sort scene elements by their position buffers hashes
     * Can be later improved to take normal and color buffers
     * into consideration as well
     */
    this.elements = this.elements.sort((a, b) =>
      a.object.bufferData.positions?.hash
        .toString()
        .localeCompare(b.object.bufferData.positions?.hash.toString())
    );
    
    for (const childChild of child.children) {
      this.connectScene(childChild);
    }
  }

  public disconnectScene(child: Object3d) {
    const idx = this.elements.findIndex((element) => element.object === child);

    if (idx !== -1) {
      this.engine.bufferManager.unregisterBuffers(
        this.elements[idx].object.bufferData
      );
      this.elements.splice(idx, 1);

      for (const childChild of child.children) {
        this.disconnectScene(childChild);
      }
    }
  }

  public addChild(child: Object3d) {
    child.updateParent(this);
    this.connectScene(child);
    this.children.push(child);
  }
}

export { Scene };
