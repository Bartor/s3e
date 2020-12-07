import { Keyframe } from "./keyframe";

class Timeline<T> {
  private keyframes: Keyframe<T>[] = [];
  private evaluatedLast: boolean = false;
  private timespan: number = 0;

  public loop: boolean = false;
  public offset: number = 0;

  constructor(
    private fps: number,
    private valueChangeCallback: ValueChangeCallback<T>,
    initialFrame: Keyframe<T>
  ) {
    this.keyframes = [initialFrame];
  }

  public addKeyframes(...keyframes: Keyframe<T>[]) {
    keyframes.forEach((keyframe) => this.addKeyframe(keyframe));
  }

  private addKeyframe(keyframe: Keyframe<T>) {
    if (keyframe.frame > this.keyframes[this.keyframes.length - 1].frame) {
      this.keyframes.push(keyframe);
      this.evaluatedLast = false;

      this.timespan =
        this.keyframes[this.keyframes.length - 1].frame / this.fps;
      return;
    }

    if (keyframe.frame < this.keyframes[0].frame) {
      this.keyframes.unshift(keyframe);
      return;
    }

    for (let i = 0; i < this.keyframes.length; i++) {
      if (this.keyframes[i].frame === keyframe.frame) {
        this.keyframes[i] = keyframe;

        this.timespan =
          this.keyframes[this.keyframes.length - 1].frame / this.fps;
        return;
      }
    }

    this.keyframes.push(keyframe);
    this.keyframes = this.keyframes.sort((a, b) => a.frame - b.frame);

    this.timespan = this.keyframes[this.keyframes.length - 1].frame / this.fps;
  }

  public evaluateAt(time: number) {
    if (
      time > this.keyframes[this.keyframes.length - 1].frame / this.fps &&
      this.evaluatedLast
    ) {
      return;
    } else {
      this.evaluatedLast = false;
    }

    time = Math.max(0, time - this.offset);

    if (this.loop) {
      time = time % this.timespan || 0;
    }

    if (this.keyframes.length === 1) {
      this.valueChangeCallback(
        1,
        this.keyframes[0].value,
        this.keyframes[0].value
      );

      this.evaluatedLast = true && !this.loop;
    } else if (
      time >=
      this.keyframes[this.keyframes.length - 1].frame / this.fps
    ) {
      this.valueChangeCallback(
        1,
        this.keyframes[this.keyframes.length - 1].value,
        this.keyframes[this.keyframes.length - 1].value
      );
      this.evaluatedLast = true && !this.loop;
    } else {
      for (let i = 0; i < this.keyframes.length; i++) {
        if (i === this.keyframes.length - 1) {
          this.valueChangeCallback(
            1,
            this.keyframes[this.keyframes.length - 1].value,
            this.keyframes[this.keyframes.length - 1].value
          );
          break;
        } else {
          if (
            time >= this.keyframes[i].frame / this.fps &&
            time < this.keyframes[i + 1].frame / this.fps
          ) {
            this.valueChangeCallback(
              this.keyframes[i].interpolation(
                (time - this.keyframes[i].frame / this.fps) /
                  ((this.keyframes[i + 1].frame - this.keyframes[i].frame) /
                    this.fps)
              ),
              this.keyframes[i].value,
              this.keyframes[i + 1].value
            );
            break;
          }
        }
      }
    }
  }
}

export { Timeline };
