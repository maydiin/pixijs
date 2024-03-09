import { Sprite, Texture, Text, Container } from "pixi.js";
import { Bodies } from "matter-js";
import { GAME_WIDTH, GAME_HEIGHT } from ".";

export class Ground {
  constructor() {
    this.texture_ground = Texture.from("../assets/orange-pane.png"); // Kutunun görüntüsü
    this.sprite_ground = new Sprite(this.texture_ground);
    this.sprite_ground.anchor.set(0.5);
    this.sprite_ground.position.set(GAME_WIDTH / 2, GAME_HEIGHT * 0.85);
    this.groundText;
    this.groundTickCross;

    this.body = Bodies.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT * 0.85,
      GAME_WIDTH,
      110,
      { isStatic: true }
    );
  }

  grayColor(selectedTexts) {
    // Sprite'ın texture'ını güncelle
    this.sprite_ground.texture = Texture.from("../assets/gray-pane.png");

    this.groundText = new Text(selectedTexts, {
      fontFamily: "Arial",
      fontSize: 45,
      fontWeight: "bold",
      fill: 0xffffff, // Beyaz renk
    });

    // Metnin konumunu ayarlayın
    this.groundText.position.set(GAME_WIDTH * 0.1, GAME_HEIGHT * 0.82); // Örnek bir pozisyon

    this.groundTickCross = new Sprite(Texture.from("../assets/cross.png"));
    this.groundTickCross.position.set(GAME_WIDTH * 0.78, GAME_HEIGHT * 0.81);
    this.groundTickCross.interactive = true;
  }

  greenColor(selectedTexts) {
    // Sprite'ın texture'ını güncelle
    this.sprite_ground.texture = Texture.from("../assets/green-pane.png");
    this.groundText.text = selectedTexts;
    this.groundTickCross = new Sprite(Texture.from("../assets/tick.png"));
    this.groundTickCross.position.set(GAME_WIDTH * 0.78, GAME_HEIGHT * 0.81);
    this.groundTickCross.interactive = true;
  }

  initColor(selectedTexts) {
    // Sprite'ın texture'ını güncelle
    this.sprite_ground.texture = Texture.from("../assets/orange-pane.png");
    this.groundText.text = selectedTexts;
    this.groundTickCross.texture = Texture.EMPTY;
  }
}
