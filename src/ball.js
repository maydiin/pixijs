import { Sprite, Texture, Text } from "pixi.js";
import { Bodies } from "matter-js";
import { GAME_WIDTH, GAME_HEIGHT } from ".";
const letters = "AAABCDEEEFGHIJKLMNOPQRSTUVWXYZ";

export class Ball {
  constructor() {
    this.noselected = true;
    this.texture = Texture.from("../assets/bubble-white.png");
    this.sprite = new Sprite(this.texture);
    this.ballSize = Math.min(Math.random() * 60 + 80, Math.random() * 60 + 80);
    this.sprite.width = this.ballSize;
    this.sprite.height = this.ballSize;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(
      GAME_WIDTH / 3 + (Math.random() * GAME_WIDTH) / 3, // X pozisyonu rastgele belirlenir
      GAME_HEIGHT * 0.1 // Y pozisyonu üst kısmında oluşturulur
    );
    this.body = Bodies.circle(this.sprite.x, this.sprite.y, this.ballSize / 2, {
      friction: 50,
    });
    this.intext = this.generateUniqueRandomLetter();
    this.text = new Text(this.intext, {
      fontFamily: "Arial",
      fontSize: 36,
      fontWeight: "bold",
      fill: 0xe79251,
    });
    this.text.anchor.set(0.5);
  }

  changeColor() {
    // Sprite'ın texture'ını güncelle
    this.sprite.texture = Texture.from("../assets/circle0.png");
    this.text.style.fill = 0xffffff;
  }

  skyColor() {
    // Sprite'ın texture'ını güncelle
    this.sprite.texture = Texture.from("../assets/circle.png");
    this.text.text = "";
  }

  initColor() {
    this.sprite.texture = Texture.from("../assets/bubble-white.png");
    this.text.style.fill = 0xe79251;
  }

  generateUniqueRandomLetter() {
    let uniqueLetters = letters.split("");
    let randomIndex = Math.floor(Math.random() * uniqueLetters.length);
    let randomLetter = uniqueLetters[randomIndex];
    uniqueLetters.splice(randomIndex, 1); // Seçilen harfi listeden kaldır
    return randomLetter;
  }
}
