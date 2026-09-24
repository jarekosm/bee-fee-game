import { Application } from 'pixi.js';
import { CONFIG } from '../config';
import { Keyboard } from '../input';
import { Food, Knight } from '../worldItems';
import { preload, setup } from './setup';

export class World {
  private readonly keyboardController = new Keyboard();
  private readonly knight: Knight;

  private constructor(private readonly app: Application) {
    this.knight = this.addKnight();
    this.addFood();
  }

  static async create(): Promise<World> {
    const app = await setup();
    await preload();
    return new World(app);
  }

  private addKnight(): Knight {
    const knight = new Knight();
    knight.setWidth(this.app.screen.width * CONFIG.world.knightWidth);
    knight.view.position.set(this.app.screen.width / 2, this.app.screen.height);
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

  private addFood(): Food {
    const food = new Food();
    food.setWidth(this.app.screen.width * CONFIG.world.foodWidth);
    this.app.stage.addChild(food.view);

    return food; // todo: czy tutaj jest potrzebny return?
  }
}
