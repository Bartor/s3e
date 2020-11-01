import { multiply } from "./../3d/matrix-operations";
import { DataBindingsValueUpdate } from "./../data-bindings/model";
import { BindingsManager } from "../data-bindings/bindings-manager.class";
import { Camera } from "../objects/camera";
import { Scene } from "./scene";
import { getS3eDefaultConfiguration } from "./default-config";
import { S3eConfiguration } from "./model";

class S3e {
  private config: S3eConfiguration;
  private bindingsManager: BindingsManager;

  public gl: WebGLRenderingContext;
  public currentScene: Scene;
  public currentCamera: Camera;

  constructor(
    private canvasElement: HTMLCanvasElement,
    config?: S3eConfiguration
  ) {
    this.gl = canvasElement.getContext("webgl");
    this.updateCanvasSize();

    this.config = config ?? getS3eDefaultConfiguration(this.gl);
    this.bindingsManager = new BindingsManager(
      this.gl,
      this.config.programInfo
    );

    this.currentScene = new Scene(this.gl);
    this.currentCamera = new Camera({
      viewAngle: Math.PI / 4,
      near: 1,
      far: 2000,
      aspectRatio: canvasElement.width / canvasElement.height,
    });
  }

  public updateCanvasSize() {
    this.canvasElement.width = this.canvasElement.clientWidth;
    this.canvasElement.height = this.canvasElement.clientHeight;

    this.gl.viewport(
      0,
      0,
      this.canvasElement.clientWidth,
      this.canvasElement.clientHeight
    );
  }

  public draw() {
    this.gl.useProgram(this.config.programInfo.program);
    this.gl.enable(this.gl.DEPTH_TEST);

    // tslint:disable-next-line: no-bitwise
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    for (const element of this.currentScene.elements) {
      const update: DataBindingsValueUpdate = {
        attributes: [[this.config.positionsAttribute, element.buffer]],
        uniforms: [
          [
            this.config.projectionUniform,
            multiply(
              this.currentCamera.perspectiveMatrix,
              element.object.absoluteMatrix
            ),
          ],
          // [this.config.worldViewUniform, this.currentCamera.cameraMatrix],
        ],
      };

      this.bindingsManager.updateValues(update);

      this.gl.drawArrays(
        this.gl.TRIANGLES,
        0,
        element.object.representation.pointsArray.length /
          element.object.representation.pointsPerFace
      );
    }
  }
}

export { S3e };
