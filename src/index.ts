import { Keyframe, KeyframeType } from "./animations/keyframe";
import { Camera } from "./objects/camera";
import { Object3d } from "./objects/object3d.class";
import { S3e } from "./se3-engine/engine";
import { createProgram } from "./shaders/create-program";
import { getFragmentShader } from "./shaders/sources/fragment";
import { getVertexShader } from "./shaders/sources/vertex";
import { Scene } from "./se3-engine/scene";
import { Timeline } from "./animations/timeline.class";
import {
  getPositionTimeline,
  getRotationTimeline,
  getScaleTimeline,
} from "./animations/default-timelines/object3d-timelines";
import { createPyramid } from "./se3-engine/representation/shapes/pyramid";
import { createCuboid } from "./se3-engine/representation/shapes/cuboid";
import { ObjectContainer } from "./objects/object-container.class";

export {
  Camera,
  createCuboid,
  createProgram,
  createPyramid,
  getFragmentShader,
  getPositionTimeline,
  getRotationTimeline,
  getScaleTimeline,
  getVertexShader,
  Keyframe,
  KeyframeType,
  Object3d,
  S3e,
  Scene,
  Timeline,
  ObjectContainer,
};
