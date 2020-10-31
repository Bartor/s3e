import { BindingsManager } from "../data-bindings/bindings-manager.class";
import { Camera } from "../objects/camera";
import { Scene } from "../objects/scene";
import { getS3eDefaultConfiguration } from "./default-config";
import { S3eConfiguration } from "./model";

class S3e {
  private glContext: WebGLRenderingContext;
  private config: S3eConfiguration;
  private bindingsManager: BindingsManager;

  public currentScene: Scene;
  public currentCamera: Camera;

  constructor(
    private canvasElement: HTMLCanvasElement,
    config?: S3eConfiguration
  ) {
    this.glContext = canvasElement.getContext("webgl");
    this.config = config ?? getS3eDefaultConfiguration(this.glContext);
    this.bindingsManager = new BindingsManager(this.glContext, config.program);

    this.updateCanvasSize();
  }

  public updateCanvasSize() {
    this.canvasElement.width = this.canvasElement.clientWidth;
    this.canvasElement.height = this.canvasElement.clientHeight;

    this.glContext.viewport(
      0,
      0,
      this.canvasElement.clientWidth,
      this.canvasElement.clientHeight
    );
  }
}

export { S3e };
