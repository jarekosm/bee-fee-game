import { Application, TilingSprite } from 'pixi.js';
import { CONFIG } from '../config';
import { Keyboard } from '../input';
import { createBackground, createFloor, Food, Knight } from '../worldItems';
import { preload, setup } from './setup';

export class World {
  private readonly keyboardController = new Keyboard();
  private readonly floor: TilingSprite;
  private readonly knight: Knight;
  private readonly foods: Food[] = [];
  private foodSpawnCooldown = 0;

  private get floorTop(): number {
    return this.app.screen.height - this.floor.height;
  }

  private constructor(private readonly app: Application) {
    this.addBackground();
    this.floor = this.addFloor();
    this.knight = this.addKnight();
    this.app.ticker.add(ticker => this.updateFoods(ticker.deltaTime));
  }

  static async create(): Promise<World> {
    const app = await setup();
    await preload();
    return new World(app);
  }

  private addBackground(): void {
    this.app.stage.addChild(createBackground(this.app));
  }

  private addFloor(): TilingSprite {
    const floor = createFloor(this.app);
    floor.position.set(0, this.app.screen.height - floor.height);

    this.app.stage.addChild(floor);

    return floor;
  }

  private addKnight(): Knight {
    const knight = new Knight();
    knight.setWidth(this.app.screen.width * CONFIG.world.knightWidth);
    knight.view.position.set(this.app.screen.width / 2, this.floorTop);

    this.app.stage.addChild(knight.view);

    this.app.ticker.add(ticker => {
      const keyPressed = this.keyboardController.getKeyPressed();
      const distance = this.app.screen.width * CONFIG.world.knightSpeed * (ticker.deltaMS / 1000);

      if (keyPressed === 'left') {
        this.knight.setMode('left');
        this.moveKnight(-distance);
      } else if (keyPressed === 'right') {
        this.knight.setMode('right');
        this.moveKnight(distance);
      } else {
        this.knight.setMode('idle');
      }
    });

    return knight;
  }

  private moveKnight(distance: number): void {
    const halfWidth = this.knight.view.width / 2;
    const nextX = this.knight.view.position.x + distance;

    this.knight.view.position.x = Math.min(
      this.app.screen.width - halfWidth,
      Math.max(halfWidth, nextX)
    );
  }

  private updateFoods(deltaTime: number): void {
    for (let i = this.foods.length - 1; i >= 0; i--) {
      const food = this.foods[i];
      food.view.position.y += CONFIG.world.foodStartSpeed * deltaTime;

      if (food.view.position.y <= this.floorTop) {
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
      (this.floorTop + food.view.height) /
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

    this.app.stage.addChildAt(food.view, this.app.stage.getChildIndex(this.floor));

    return food;
  }
}
