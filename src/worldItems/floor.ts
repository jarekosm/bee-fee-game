import { Application, Assets, Rectangle, Texture, TilingSprite } from 'pixi.js';
import { CONFIG } from '../config';

export function createFloor(app: Application): TilingSprite {
  const heightRatio = 0.1;

  const sheet = Assets.get<Texture>(CONFIG.assets.backgrounds.alias);
  sheet.source.scaleMode = 'nearest';

  const texture = new Texture({
    source: sheet.source,
    frame: new Rectangle(sheet.width / 2, 0, sheet.width / 2, sheet.height),
  });

  return new TilingSprite({
    texture,
    width: app.screen.width,
    height: app.screen.height * heightRatio,
  });
}
