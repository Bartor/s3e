window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(
    engine.bufferManager.loadShape(createCuboid(20), [0, 0.44, 1, 1])
  );

  engine.currentScene.addChild(cubeObject);

  engine.currentScene.ambientLightLevel = 0.8;
  engine.currentScene.currentCamera.position.z = 100;

  const position = getPositionTimeline(cubeObject, 60);
  position.loop = true;

  position.addKeyframes(
    {
      frame: 0,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 60,
      value: { x: 30, y: 0, z: 0 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 120,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 540,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 600,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 660,
      value: { x: -20, y: 10, z: -30 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 720,
      value: { x: -20, y: 10, z: -30 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 780,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 840,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.HOLD,
    }
  );

  const rotation = getRotationTimeline(cubeObject, 60);
  rotation.loop = true;

  rotation.addKeyframes(
    {
      frame: 180,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 240,
      value: { x: Math.PI, y: 0, z: 0 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 300,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 540,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 600,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 660,
      value: { x: Math.PI / 3, y: (37 / 21) * Math.PI, z: Math.PI / 5 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 720,
      value: { x: Math.PI / 3, y: (37 / 21) * Math.PI, z: Math.PI / 5 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 780,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 840,
      value: { x: 0, y: 0, z: 0 },
      interpolation: KeyframeType.HOLD,
    }
  );

  const scale = getScaleTimeline(cubeObject, 60);
  scale.loop = true;

  scale.addKeyframes(
    {
      frame: 360,
      value: { x: 1, y: 1, z: 1 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 420,
      value: { x: 2, y: 0.5, z: 1 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 480,
      value: { x: 1, y: 1, z: 1 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 180,
      value: { x: 1, y: 1, z: 1 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 600,
      value: { x: 1, y: 1, z: 1 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 660,
      value: { x: 1, y: 1 / 3, z: 2 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 720,
      value: { x: 1, y: 1 / 3, z: 2 },
      interpolation: KeyframeType.SQUARE_IN_OUT,
    },
    {
      frame: 780,
      value: { x: 1, y: 1, z: 1 },
      interpolation: KeyframeType.HOLD,
    },
    {
      frame: 840,
      value: { x: 1, y: 1, z: 1 },
      interpolation: KeyframeType.HOLD,
    }
  );

  const values = document.querySelectorAll("td");

  function draw(t) {
    requestAnimationFrame(draw);

    position.evaluateAt(t / 2000);
    rotation.evaluateAt(t / 2000);
    scale.evaluateAt(t / 2000);

    engine.draw();

    values.forEach((value, index) => {
      value.textContent = cubeObject.absoluteMatrix[index]
        .toFixed(2)
        .padStart(5, "0");
    });
  }

  draw(0);
}
