import { multiply } from "./../3d/matrix-operations";
import { DataUpdateCall } from "./../data-bindings/model";
import { BindingsManager } from "../data-bindings/bindings-manager.class";
import { Camera } from "../objects/camera";
import { Scene } from "./scene";
import { getS3eDefaultConfiguration } from "./default-config";
import { S3eConfiguration } from "./model";
import { Mat4, Vec3 } from "../3d/model";

class S3e {
  private worldViewAllocation = new Float32Array(16);

  private config: S3eConfiguration;
  private bindingsManager: BindingsManager;

  private positionUpdateCall: DataUpdateCall<WebGLBuffer>;
  private normalsUpdateCall: DataUpdateCall<WebGLBuffer>;
  private worldViewUpdateCall: DataUpdateCall<Mat4>;
  private ambientUpdateCall: DataUpdateCall<number>;
  private lightDirectionUpdateCall: DataUpdateCall<Vec3>;

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

    this.positionUpdateCall = this.bindingsManager.bindings[
      this.config.positionsAttributeName
    ].call;

    this.normalsUpdateCall = this.bindingsManager.bindings[
      this.config.normalsAttributeName
    ].call;

    this.worldViewUpdateCall = this.bindingsManager.bindings[
      this.config.worldViewUniformName
    ].call;

    this.ambientUpdateCall = this.bindingsManager.bindings[
      this.config.ambientUniformName
    ].call;

    this.lightDirectionUpdateCall = this.bindingsManager.bindings[
      this.config.lightDirectionUniformName
    ].call;

    this.currentScene = new Scene(this.gl);

    this.currentCamera = new Camera({
      viewAngle: Math.PI / 4,
      near: 1,
      far: 2000,
      aspectRatio: canvasElement.width / canvasElement.height,
    });

    this.currentScene.addChild(this.currentCamera);
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
    this.gl.enable(this.gl.CULL_FACE);

    // tslint:disable-next-line: no-bitwise
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    for (const element of this.currentScene.elements) {
      multiply(
        this.currentCamera.perspectiveMatrix,
        this.currentCamera.viewMatrix,
        this.worldViewAllocation
      );

      multiply(
        this.worldViewAllocation,
        element.object.absoluteMatrix,
        this.worldViewAllocation
      );

      this.positionUpdateCall(element.positionsBuffer);
      this.normalsUpdateCall(element.normalsBuffer);

      this.worldViewUpdateCall(this.worldViewAllocation, false);
      this.ambientUpdateCall(this.currentScene.ambientLightLevel);
      this.lightDirectionUpdateCall(this.currentScene.lightDirection);

      this.gl.drawArrays(
        this.gl.TRIANGLES,
        0,
        element.object.representation.pointsArray.length /
          element.object.representation.pointsPerFace
      );
    }

    for (const element of this.currentScene.elements) {
      element.object.changed = false;
    }
  }
}

export { S3e };
