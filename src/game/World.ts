import { Application } from 'pixi.js';
import { CONFIG } from '../config';
import { Keyboard } from '../input';
import { Food, Knight } from '../worldItems';
import { preload, setup } from './setup';

export class World {
  private readonly keyboardController = new Keyboard();
  private readonly knight: Knight;
  private readonly foods: Food[] = [];
  private foodSpawnCooldown = 0;

  private constructor(private readonly app: Application) {
    this.knight = this.addKnight();
    this.app.ticker.add(ticker => this.updateFoods(ticker.deltaTime));
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

  private updateFoods(deltaTime: number): void {
    for (let i = this.foods.length - 1; i >= 0; i--) {
      const food = this.foods[i];
      food.view.position.y += CONFIG.world.foodStartSpeed * deltaTime;

      if (food.view.position.y <= this.app.screen.height) {
        continue;
      }

      this.app.stage.removeChild(food.view);
      food.view.destroy();
      this.foods.splice(i, 1);
    }

    if (this.foods.length >= CONFIG.world.foodStartAmount) {
      this.foodSpawnCooldown = 0;
      return;
    }

    this.foodSpawnCooldown -= deltaTime;

    if (this.foodSpawnCooldown > 0) {
      return;
    }

    const food = this.addFood();
    this.foods.push(food);
    this.foodSpawnCooldown =
      (this.app.screen.height + food.view.height) /
      CONFIG.world.foodStartAmount /
      CONFIG.world.foodStartSpeed;
  }

  private addFood(): Food {
    const food = new Food();
    food.setWidth(this.app.screen.width * CONFIG.world.foodWidth);
    food.view.position.set(
      Math.random() * (this.app.screen.width - food.view.width),
      -food.view.height
    );
    this.app.stage.addChild(food.view);

    return food;
  }
}
