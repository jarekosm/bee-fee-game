import { Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { CONFIG } from '../config';

const SPRITE_CONFIG = Object.freeze({
  COLUMNS: 8,
  ROWS: 8,
});

export class Food {
  public readonly view = new Container();
  private readonly sprite: Sprite;

  constructor() {
    const sheet = Assets.get<Texture>(CONFIG.assets.food.alias);
    sheet.source.scaleMode = 'nearest';

    const randomFoodIndex = Math.floor(Math.random() * SPRITE_CONFIG.COLUMNS * SPRITE_CONFIG.ROWS);

    const frameWidth = sheet.width / SPRITE_CONFIG.COLUMNS;
    const frameHeight = sheet.height / SPRITE_CONFIG.ROWS;
    const x = randomFoodIndex % SPRITE_CONFIG.COLUMNS;
    const y = Math.floor(randomFoodIndex / SPRITE_CONFIG.COLUMNS);

    const texture = new Texture({
      source: sheet.source,
      frame: new Rectangle(x * frameWidth, y * frameHeight, frameWidth, frameHeight),
    });

    this.sprite = new Sprite({
      texture: texture,
    });

    this.view.addChild(this.sprite);
  }

  public setWidth(width: number): void {
    this.view.scale.set(width / this.sprite.texture.width);
  }
}
