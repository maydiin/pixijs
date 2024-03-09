import gsap, { Power0 } from "gsap";
import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";

export default class Game extends Container {
  constructor() {
    super();

    this.init();
  }

  init() {
    let sprite = Sprite.from("logo");
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    this.addChild(sprite);
    sprite.x = GAME_WIDTH * 0.5;
    sprite.y = GAME_HEIGHT * 0.5;

    let startHand = Sprite.from("assets/hand.png");
    startHand.anchor.set(0.5);
    startHand.scale.set(0.5);
    this.addChild(startHand);
    startHand.x = GAME_WIDTH * 0.5;
    startHand.y = GAME_HEIGHT * 0.7;

    gsap.to(sprite, {
      pixi: {
        scale: 0.6,
      },
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.easeInOut",
    });

    gsap.to(startHand, {
      pixi: {
        scale: 0.6,
      },
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.easeInOut",
    });
  }
}
