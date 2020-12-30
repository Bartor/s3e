window.addEventListener("load", main);

async function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  engine.currentScene.ambientLightLevel = 0.1;
  engine.currentScene.lightDirection = [-0.5, 0.4, 0.4];

  const text = await fetch("HDU_lowRez_part1.obj").then(async (data) =>
    data.text()
  );

  const text2 = await fetch("HDU_lowRez_part2.obj").then(async (data) =>
    data.text()
  );

  const first = new Object3d(
    engine.bufferManager.loadObj(text, { texture: { source: "HDU_01.jpg" } })
  );

  const second = new Object3d(
    engine.bufferManager.loadObj(text2, { texture: { source: "HDU_02.jpg" } })
  );

  first.scale = { x: 0.1, y: 0.1, z: 0.1 };
  first.position.y = -20;
  first.addChild(second);

  engine.currentScene.addChild(first);

  engine.currentScene.currentCamera.position.z = 300;

  function draw(t) {
    requestAnimationFrame(draw);

    first.rotation.y = t / 1000;

    engine.draw();
  }

  draw(0);
}
