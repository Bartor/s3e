import { normalize } from "./../3d/matrix-operations";
import { Vec3 } from "./../3d/model";
import { Camera } from "../objects/camera";
import { Object3d } from "../objects/object3d.class";
import { Hash, SceneObject } from "./model";
import { S3e } from "./engine";
import { firstBy } from "thenby";

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
      drawable: child.representation.featuresMask !== 0,
      object: child,
    });

    // Count which buffers hold how many different hashes
    const buckets: Record<string, Set<Hash>> = {};
    this.elements
      .filter((element) => element.drawable)
      .forEach((element) => {
        Object.entries(element.object.representation.bufferData).forEach(
          ([key, value]) => {
            buckets[key] = buckets[key]
              ? buckets[key].add(value.hash)
              : new Set([value.hash]);
          }
        );
      });

    // First sort by the features (open gl program)
    let sortingFn = firstBy<SceneObject>(
      (a, b) =>
        a.object.representation.featuresMask -
        b.object.representation.featuresMask
    );

    // Then sort by the least popular (so the switching isn't too often) buffers
    Object.entries(buckets)
      .sort(([_, a], [__, b]) => a.size - b.size)
      .forEach(([key], index) => {
        sortingFn = sortingFn.thenBy((a, b) => {
          // Interlay asc/desc sort to join subsequent properties
          if (index % 2) {
            [a, b] = [b, a];
          }

          return a.object.representation.bufferData[key]?.hash
            .toString()
            .localeCompare(
              b.object.representation.bufferData[key]?.hash.toString()
            );
        });
      });

    this.elements = this.elements.sort(sortingFn);

    for (const childChild of child.children) {
      this.connectScene(childChild);
    }
  }

  public disconnectScene(child: Object3d) {
    const idx = this.elements.findIndex((element) => element.object === child);

    if (idx !== -1) {
      this.engine.bufferManager.unregisterBuffers(
        this.elements[idx].object.representation.bufferData
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
