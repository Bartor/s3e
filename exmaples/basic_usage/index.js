window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(createCuboid(20));

  const timeline = getPositionTimeline(cubeObject, 60);

  const keyframe0 = {
    frame: 0,
    value: { x: 10, y: 10, z: 10 },
    interpolation: KeyframeType.LINEAR,
  };

  const keyframe1 = {
    frame: 10,
    value: { x: 10, y: 10, z: 10 },
    interpolation: KeyframeType.LINEAR,
  };

  timeline.addKeyframe(keyframe0);
  timeline.addKeyframe(keyframe1);

  console.log(timeline.keyframes);

  const keyframe2 = {
    frame: 5,
    value: { x: 10, y: 10, z: 10 },
    interpolation: KeyframeType.LINEAR,
  };

  timeline.addKeyframe(keyframe2);

  console.log(timeline.keyframes);

  const cubeChild = new Object3d(createCuboid(10));
  cubeChild.position.y = 30;

  console.log(cubeChild.representation);

  cubeObject.addChild(cubeChild);
  engine.currentScene.addChild(cubeObject);

  engine.currentScene.ambientLightLevel = 0.8;

  engine.currentCamera.position.z = 100;

  function draw(t) {
    requestAnimationFrame(draw);

    cubeObject.rotation.z = t / 1000;
    cubeObject.rotation.x = t / 1000;

    cubeChild.scale.y = Math.abs(Math.sin(t / 500)) + 0.5;
    cubeChild.position.y = 30 - 10 * Math.sin(t / 500);

    engine.draw();
  }

  draw();
}
