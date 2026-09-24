import { AnimatedSprite, Assets, Container, Rectangle, Texture } from 'pixi.js';
import { CONFIG } from '../config';

const SPRITE_CONFIG = Object.freeze({
  COLUMNS: 8,
  ROWS: 5,
  IDLE_FRAME_COUNT: 4,
});

export class Knight {
  public readonly view = new Container();

  constructor() {
    const sheet = Assets.get<Texture>(CONFIG.assets.knight.alias);
    sheet.source.scaleMode = 'nearest'; // todo: sprawdzić czy to jest potrzebne

    const frameWidth = sheet.width / SPRITE_CONFIG.COLUMNS;
    const frameHeight = sheet.height / SPRITE_CONFIG.ROWS;
    const frames = Array.from({ length: SPRITE_CONFIG.IDLE_FRAME_COUNT }, (_, index) => {
      return new Texture({
        source: sheet.source,
        frame: new Rectangle(index * frameWidth, 0, frameWidth, frameHeight),
      });
    });

    this.view.addChild(
      new AnimatedSprite({
        textures: frames,
        animationSpeed: 0.1,
        loop: true,
        autoPlay: true,
      })
    );
  }
}
