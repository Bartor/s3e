import { Position3d, Rotation3d } from "./model";

export abstract class Object3d {
  public translationMatrix: Float32Array = new Float32Array(16);

  public position: Position3d = { x: 0, y: 0, z: 0 };
  public rotation: Rotation3d = { x: 0, y: 0, z: 0 };

  protected children: Object3d[] = [];
  protected parent: Object3d;

  public appendChild(child: Object3d) {
    this.children.push(child);
  }

  public removeChild(child: Object3d) {
    const index = this.children.indexOf(child);

    if (index > -1) {
      this.children.slice(this.children.indexOf(child), 1);
    }
  }
}
