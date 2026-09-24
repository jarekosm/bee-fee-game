import { Application, Assets, Rectangle, Texture, TilingSprite } from 'pixi.js';
import { CONFIG } from '../config';

export function createBackground(app: Application): TilingSprite {
  const sheet = Assets.get<Texture>(CONFIG.assets.backgrounds.alias);
  sheet.source.scaleMode = 'nearest';

  const texture = new Texture({
    source: sheet.source,
    frame: new Rectangle(0, 0, sheet.width / 2, sheet.height),
  });

  return new TilingSprite({
    texture,
    width: app.screen.width,
    height: app.screen.height,
    alpha: CONFIG.world.backgroundAlpha,
  });
}
