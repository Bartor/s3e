import { Keyframe, KeyframeType } from "./animations/keyframe";
import { getS3eDefaultConfiguration } from "./se3-engine/default-config";
import { BindingsManager } from "./data-bindings/bindings-manager.class";
import { Camera } from "./objects/camera";
import { Object3d } from "./objects/object3d.class";
import { S3e } from "./se3-engine/engine";
import { createProgram } from "./shaders/create-program";
import { getFragmentShader } from "./shaders/sources/fragment";
import { getVertexShader } from "./shaders/sources/vertex";
import { parseShader } from "./shaders/parse-shader";
import { Scene } from "./se3-engine/scene";
import { Timeline } from "./animations/timeline.class";
import {
  getPositionTimeline,
  getRotationTimeline,
  getScaleTimeline,
} from "./animations/default-timelines/object3d-timelines";
import { createPyramid } from "./se3-engine/representation/shapes/pyramid";
import { createCuboid } from "./se3-engine/representation/shapes/cuboid";

export {
  BindingsManager,
  Camera,
  createCuboid,
  createProgram,
  createPyramid,
  getFragmentShader,
  getPositionTimeline,
  getRotationTimeline,
  getS3eDefaultConfiguration,
  getScaleTimeline,
  getVertexShader,
  Keyframe,
  KeyframeType,
  Object3d,
  parseShader,
  S3e,
  Scene,
  Timeline,
};
