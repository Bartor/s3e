import { KeyframeType } from "./../keyframe";
import { Position3d } from "./../../objects/model";
import { Object3d } from "../../objects/object3d.class";
import { Timeline } from "../timeline.class";

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
