import { AnimatedSprite, Assets, Container, Rectangle, Texture } from 'pixi.js';
import { CONFIG } from '../config';

const SPRITE_CONFIG = Object.freeze({
  COLUMNS: 8,
  ROWS: 5,
});

const SPRITE_ANIMATIONS = Object.freeze({
  idle: { row: 0, fromColumn: 0, frameCount: 4 },
  right: { row: 2, fromColumn: 0, frameCount: 4 },
  left: { row: 2, fromColumn: 4, frameCount: 4 },
});

export type TKnightMode = keyof typeof SPRITE_ANIMATIONS;

export class Knight {
  public readonly view = new Container();
  private readonly sprite: AnimatedSprite;
  private readonly frames: Record<TKnightMode, Texture[]>;
  private mode: TKnightMode = 'idle';

  constructor() {
    const sheet = Assets.get<Texture>(CONFIG.assets.knight.alias);
    sheet.source.scaleMode = 'nearest';

    this.frames = {
      idle: this.loadFramesForAnimation(sheet, SPRITE_ANIMATIONS.idle),
      right: this.loadFramesForAnimation(sheet, SPRITE_ANIMATIONS.right),
      left: this.loadFramesForAnimation(sheet, SPRITE_ANIMATIONS.left),
    };

    this.sprite = new AnimatedSprite({
      textures: this.frames.idle,
      animationSpeed: 0.1,
      loop: true,
      autoPlay: true,
    });
    this.view.addChild(this.sprite);
  }

  public setMode(mode: TKnightMode): void {
    if (this.mode === mode) {
      return;
    }

    this.mode = mode;
    this.sprite.textures = this.frames[mode];
    this.sprite.play();
  }

  private loadFramesForAnimation(
    sheet: Texture,
    animation: { row: number; fromColumn: number; frameCount: number }
  ): Texture[] {
    const frameWidth = sheet.width / SPRITE_CONFIG.COLUMNS;
    const frameHeight = sheet.height / SPRITE_CONFIG.ROWS;

    return Array.from({ length: animation.frameCount }, (_, index) => {
      const column = animation.fromColumn + index;

      return new Texture({
        source: sheet.source,
        frame: new Rectangle(
          column * frameWidth,
          animation.row * frameHeight,
          frameWidth,
          frameHeight
        ),
      });
    });
  }
}
