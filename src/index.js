import { Application, Sprite, Texture, Text, BlurFilterPass } from "pixi.js";
import { gsap } from "gsap";
import { Engine, World, Bodies, Runner, Composite } from "matter-js";
import { Ball } from "./ball";
import { Ground } from "./ground";
var words = require("an-array-of-english-words");

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

export const app = new Application({
  backgroundColor: 0xe79251,
  antialias: true,
  hello: true,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

app.ticker.stop();
gsap.ticker.add(() => {
  app.ticker.update();
});

async function init() {
  document.body.appendChild(app.view);

  // create an engine
  const engine = Engine.create();
  const world = engine.world;
  engine.gravity.y = 3;
  // create two boxes and a ground

  const boundaryWidth = 50; // Sınırların genişliği

  // Sol sınır
  const leftBoundary = Bodies.rectangle(
    -boundaryWidth / 2,
    GAME_HEIGHT / 2,
    boundaryWidth,
    GAME_HEIGHT,
    { isStatic: true }
  );

  // Sağ sınır
  const rightBoundary = Bodies.rectangle(
    GAME_WIDTH + boundaryWidth / 2,
    GAME_HEIGHT / 2,
    boundaryWidth,
    GAME_HEIGHT,
    { isStatic: true }
  );

  World.add(world, [leftBoundary, rightBoundary]);

  let ground = new Ground();
  app.stage.addChild(ground.sprite_ground);
  World.add(world, [ground.body]);
  let selectedTexts = "";
  let numselected = 0;
  let level = 0;

  fall(20, world, cb);
  function cb(balls) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].sprite.on("pointerdown", () => {
        if (balls[i].noselected) {
          numselected++;

          balls[i].changeColor();
          selectedTexts += balls[i].text.text;
          balls[i].noselected = false;
        } else {
          numselected--;

          balls[i].initColor();
          selectedTexts = selectedTexts.replace(balls[i].text.text, ""); // Metini listeden kaldırın
          balls[i].noselected = true;
        }
        if (numselected != 0) {
          app.stage.removeChild(ground.groundText);

          // Kelimeyi İngilizce kelimeler dizisinde ara
          if (
            words.includes(selectedTexts.toLowerCase()) &&
            selectedTexts.length > 2
          ) {
            app.stage.removeChild(ground.groundTickCross);

            ground.greenColor(selectedTexts);

            app.stage.addChild(ground.groundTickCross);
            ground.groundTickCross.on("pointerdown", () => {
              level++;
              balls.forEach((ball) => {
                if (level == 4) {
                  ball.skyColor();
                  gsap.to(ball.sprite.scale, {
                    x: 1.1, // X ölçeğini 1.5 katına büyüt
                    y: 1.1, // Y ölçeğini 1.5 katına büyüt
                    duration: 0.6, // Animasyon süresi
                    ease: "power2.inOut", // Animasyon eğrisi

                    onComplete: () => {
                      // Animasyon tamamlandığında sprite'ı sahneden kaldır
                      Composite.remove(world, ball.body);
                      app.stage.removeChild(ball.sprite);
                      ground.groundText.text = "";
                      selectedTexts = "";
                      numselected = 0;
                      ground.initColor();
                    },
                  });

                  gsap.to(ball.sprite, {
                    alpha: 0, // Saydamlığı sıfıra düşür
                    duration: 0.4,
                  });
                } else {
                  if (!ball.noselected) {
                    ball.skyColor();
                    gsap.to(ball.sprite.scale, {
                      x: 1.1, // X ölçeğini 1.5 katına büyüt
                      y: 1.1, // Y ölçeğini 1.5 katına büyüt
                      duration: 0.6, // Animasyon süresi
                      ease: "power2.inOut", // Animasyon eğrisi

                      onComplete: () => {
                        // Animasyon tamamlandığında sprite'ı sahneden kaldır
                        Composite.remove(world, ball.body);
                        app.stage.removeChild(ball.sprite);
                        ground.groundText.text = "";
                        selectedTexts = "";
                        numselected = 0;
                        ground.initColor();
                      },
                    });

                    gsap.to(ball.sprite, {
                      alpha: 0, // Saydamlığı sıfıra düşür
                      duration: 0.4,
                    });
                  }
                }
              });
            });
          } else {
            app.stage.removeChild(ground.groundTickCross);

            ground.grayColor(selectedTexts);

            app.stage.addChild(ground.groundTickCross);
            ground.groundTickCross.on("pointerdown", () => {
              app.stage.removeChild(ground.groundTickCross);
              numselected = 0;
              selectedTexts = "";
              app.stage.removeChild(ground.groundText);
              app.stage.removeChild(ground.groundTickCross);
              ground.initColor(selectedTexts);
              balls.forEach((ball) => {
                if (!ball.noselected) {
                  ball.initColor();
                  ball.noselected = true;
                }
              });
            });
          }
          app.stage.addChild(ground.groundText);
        } else {
          app.stage.removeChild(ground.groundTickCross);

          app.stage.removeChild(ground.groundText);
          ground.initColor(selectedTexts);
          selectedTexts = "";
        }
      });
    }
  }
  Runner.run(engine);
}

init();

function fall(num, world, callback) {
  let count = 0;
  let balls = [];
  const interval = setInterval(() => {
    const ball = new Ball();
    ball.sprite.interactive = true;
    app.stage.addChild(ball.sprite);
    ball.text.position.set(ball.sprite.x, ball.sprite.y);

    app.stage.addChild(ball.text);
    gsap.ticker.add(() => {
      ball.sprite.position.set(ball.body.position.x, ball.body.position.y);
      ball.text.position.set(ball.body.position.x, ball.body.position.y);
    });
    balls.push(ball);
    World.add(world, [ball.body]);
    count++;
    if (count === num) {
      clearInterval(interval);
      callback(balls);
    }
  }, 300);
}
