window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  engine.currentScene.ambientLightLevel = 0.5;
  engine.currentScene.lightDirection = [-0.5, 0.5, 0.5];

  fetch("LunarLander.obj").then(async (data) => {
    const text = await data.text();

    const lander = new Object3d(loadObj(text, [0.2, 0.44, 0, 1]));

    lander.rotation.x = -Math.PI / 2;
    lander.position.y = -2;

    engine.currentScene.addChild(lander);

    function draw(t) {
      requestAnimationFrame(draw);

      lander.rotation.z = t / 1000;

      engine.draw();
    }

    draw();
  });

  engine.currentScene.currentCamera.position.z = 10;
}
