import { Application } from 'pixi.js';
import { Keyboard } from '../input';
import { Knight } from '../worldItems';
import { preload, setup } from './setup';

export class World {
  private readonly keyboardController = new Keyboard();
  private readonly knight: Knight;

  private constructor(private readonly app: Application) {
    this.knight = this.addKnight();
  }

  static async create(): Promise<World> {
    const app = await setup();
    await preload();
    return new World(app);
  }

  private addKnight(): Knight {
    const knight = new Knight();
    knight.view.position.set(this.app.screen.width / 2, this.app.screen.height / 2); // todo: ustawić prawidłową pozycję
    // todo: ustawić odpowiednią skalę
    this.app.stage.addChild(knight.view);

    this.app.ticker.add(() => {
      const keyPressed = this.keyboardController.getKeyPressed();

      if (keyPressed === 'left') {
        this.knight.setMode('left');
        return;
      } else if (keyPressed === 'right') {
        this.knight.setMode('right');
        return;
      } else {
        this.knight.setMode('idle');
      }
    });

    return knight;
  }
}
