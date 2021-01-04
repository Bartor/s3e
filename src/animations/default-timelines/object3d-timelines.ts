import { Rotation3d, Scale3d } from "./../../objects/model";
import { KeyframeType } from "../keyframe";
import { Position3d } from "../../objects/model";
import { Object3d } from "../../objects/object3d.class";
import { Timeline } from "../timeline.class";

/**
 * Creates a position controlling timeline
 * @param {Object3d} object An object to be controller
 * @param {number} fps Number of frames per second
 */
export const getPositionTimeline = (object: Object3d, fps: number) =>
  new Timeline<Position3d>(
    fps,
    (progress, previous, next) => {
      object.position.x = progress * next.x + (1 - progress) * previous.x;
      object.position.y = progress * next.y + (1 - progress) * previous.y;
      object.position.z = progress * next.z + (1 - progress) * previous.z;
    },
    {
      frame: 0,
      value: {
        // These are getters and cannot be used with spread operator
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
      interpolation: KeyframeType.LINEAR,
    }
  );

/**
 * Creates a rotation controlling timeline
 * @param {Object3d} object An object to be controller
 * @param {number} fps Number of frames per second
 */
export const getRotationTimeline = (object: Object3d, fps: number) =>
  new Timeline<Rotation3d>(
    fps,
    (progress, previous, next) => {
      object.rotation.x = progress * next.x + (1 - progress) * previous.x;
      object.rotation.y = progress * next.y + (1 - progress) * previous.y;
      object.rotation.z = progress * next.z + (1 - progress) * previous.z;
    },
    {
      frame: 0,
      value: {
        // These are getters and cannot be used with spread operator
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z,
      },
      interpolation: KeyframeType.LINEAR,
    }
  );

/**
 * Creates a scale controlling timeline
 * @param {Object3d} object An object to be controller
 * @param {number} fps Number of frames per second
 */
export const getScaleTimeline = (object: Object3d, fps: number) =>
  new Timeline<Scale3d>(
    fps,
    (progress, previous, next) => {
      object.scale.x = progress * next.x + (1 - progress) * previous.x;
      object.scale.y = progress * next.y + (1 - progress) * previous.y;
      object.scale.z = progress * next.z + (1 - progress) * previous.z;
    },
    {
      frame: 0,
      value: {
        // These are getters and cannot be used with spread operator
        x: object.scale.x,
        y: object.scale.y,
        z: object.scale.z,
      },
      interpolation: KeyframeType.LINEAR,
    }
  );
