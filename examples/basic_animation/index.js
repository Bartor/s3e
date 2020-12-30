window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(
    engine.bufferManager.loadShape(createCuboid(20), { color: [0, 0.44, 1, 1] })
  );

  const timeline = getPositionTimeline(cubeObject, 60);
  timeline.loop = true;
  timeline.offset = 2;

  const k0 = {
    frame: 0,
    value: { x: 0, y: 0, z: 0 },
    interpolation: KeyframeType.SQUARE_IN_OUT,
  };

  const k1 = {
    frame: 60,
    value: { x: 30, y: 0, z: 50 },
    interpolation: KeyframeType.SQUARE_IN_OUT,
  };

  const k2 = {
    frame: 120,
    value: { x: 0, y: 0, z: 0 },
    interpolation: KeyframeType.HOLD,
  };

  const k3 = {
    frame: 180,
    value: { x: 0, y: 0, z: 0 },
    interpolation: KeyframeType.HOLD,
  };

  timeline.addKeyframes(k0, k1, k2, k3);

  engine.currentScene.addChild(cubeObject);

  engine.currentScene.lightDirection = [1, 0.5, 0.5];

  engine.currentScene.ambientLightLevel = 0.8;
  engine.currentScene.currentCamera.position.z = 100;

  const textNode = document.getElementById("time");

  function draw(t) {
    requestAnimationFrame(draw);

    timeline.evaluateAt(t / 1000);
    textNode.textContent = `t = ${(t / 1000).toFixed(4)}`;

    engine.draw();
  }

  draw();
}
