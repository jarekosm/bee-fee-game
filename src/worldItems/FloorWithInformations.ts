import { Application, Assets, Container, Rectangle, Texture, TilingSprite } from 'pixi.js';
import { CONFIG } from '../config';

export class FloorWithInformations {
  public readonly view = new Container();
  private readonly heightRatio = 0.1;

  constructor(private readonly app: Application) {
    const sheet = Assets.get<Texture>(CONFIG.assets.backgrounds.alias);
    sheet.source.scaleMode = 'nearest';

    const texture = new Texture({
      source: sheet.source,
      frame: new Rectangle(sheet.width / 2, 0, sheet.width / 2, sheet.height),
    });

    const sprite = new TilingSprite({
      texture,
      width: app.screen.width,
      height: app.screen.height * this.heightRatio,
    });

    this.view.addChild(sprite);
  }
}
