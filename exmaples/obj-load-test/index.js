window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  engine.currentScene.ambientLightLevel = 0.5;
  engine.currentScene.lightDirection = [-0.5, 0.5, 0.5];

  fetch("LunarLander.obj").then(async (data) => {
    const text = await data.text();

    const lander1 = new Object3d(
      engine.bufferManager.loadObj(text, [0.2, 0.44, 0, 1])
    );

    const lander2 = new Object3d(
      engine.bufferManager.loadObj(text, [1, 0.44, 0, 1])
    );

    lander1.rotation.x = -Math.PI / 2;
    lander1.position.y = -2;

    lander2.rotation.x = -Math.PI / 2;
    lander2.position.y = 2;

    engine.currentScene.addChild(lander1);
    engine.currentScene.addChild(lander2);

    function draw(t) {
      requestAnimationFrame(draw);

      lander1.rotation.z = t / 1000;

      engine.draw();
    }

    draw();
  });

  engine.currentScene.currentCamera.position.z = 10;
}
