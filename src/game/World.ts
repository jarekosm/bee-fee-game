import { Application, TilingSprite } from 'pixi.js';
import { CONFIG } from '../config';
import { Keyboard } from '../input';
import {
  Announcement,
  createBackground,
  createFloor,
  Food,
  HealthIndicator,
  Knight,
  PointsIndicator,
} from '../worldItems';
import { EGameEvent, GameState } from './GameState';
import { Sounds } from './Sounds';
import { preload, setup } from './setup';

export class World {
  private readonly keyboardController = new Keyboard();
  private readonly announcement: Announcement;
  private readonly floor: TilingSprite;
  private readonly healthIndicator: HealthIndicator;
  private readonly pointsIndicator: PointsIndicator;
  private readonly knight: Knight;
  private readonly foods: Food[] = [];
  private readonly gameState = new GameState(10);
  private readonly sounds = new Sounds();
  private foodSpawnCooldown = 0;
  private canRestart = false;

  private get floorTop(): number {
    return this.app.screen.height - this.floor.height;
  }

  private constructor(private readonly app: Application) {
    this.addBackground();
    this.floor = this.addFloor();
    this.knight = this.addKnight();
    this.app.ticker.add(ticker => this.updateFoods(ticker.deltaTime));
    this.healthIndicator = this.addHealthIndicator();
    this.pointsIndicator = this.addPointsIndicator();
    this.announcement = this.addAnnouncement();

    this.gameState.addEventListener(EGameEvent.CHANGE, () => {
      this.healthIndicator.setHealth(this.gameState.getHealth());
      this.pointsIndicator.setPoints(this.gameState.getPoints());
    });
    this.gameState.addEventListener(EGameEvent.START, () => {
      this.announcement.removeText();
    });
    this.gameState.addEventListener(EGameEvent.GAME_OVER, () => {
      const title = 'Koniec gry';
      const subtitle = 'Porusz bohaterem, aby zagrać od nowa!';

      this.canRestart = false;
      this.sounds.playGameOver();
      this.announcement.setText(title, '');

      setTimeout(() => {
        this.canRestart = true;
        this.announcement.setText(title, subtitle);
      }, 1e3);
    });
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
    if (this.gameState.isGameOver() && this.canRestart) {
      this.clearFoods();
      this.foodSpawnCooldown = 0;
      this.gameState.reset();
    }

    this.gameState.start();

    const halfWidth = this.knight.view.width / 2;
    const nextX = this.knight.view.position.x + distance;

    this.knight.view.position.x = Math.min(
      this.app.screen.width - halfWidth,
      Math.max(halfWidth, nextX)
    );
  }

  private updateFoods(deltaTime: number): void {
    if (!this.gameState.isStarted() || this.gameState.isGameOver()) {
      return;
    }

    const knightBounds = this.knight.view.getBounds().rectangle;

    for (let i = this.foods.length - 1; i >= 0; i--) {
      const food = this.foods[i];
      food.view.position.y += CONFIG.world.foodStartSpeed * deltaTime;

      if (knightBounds.intersects(food.view.getBounds().rectangle)) {
        this.removeFood(i);
        this.gameState.addPoint();
        this.sounds.playCollect();
        continue;
      }

      if (food.view.position.y <= this.floorTop) {
        continue;
      }

      this.removeFood(i);
      this.gameState.removeHealth();
      this.sounds.playHurt();
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

  private clearFoods(): void {
    for (let i = this.foods.length - 1; i >= 0; i--) {
      this.removeFood(i);
    }
  }

  private removeFood(index: number): void {
    const food = this.foods[index];
    this.app.stage.removeChild(food.view);
    food.view.destroy();
    this.foods.splice(index, 1);
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

  private addAnnouncement(): Announcement {
    const announcement = new Announcement();

    announcement.view.position.set(
      this.app.screen.width / 2,
      (this.app.screen.height - announcement.view.height) / 2 - this.app.screen.height * 0.08
    );

    this.app.stage.addChild(announcement.view);

    return announcement;
  }

  private addHealthIndicator(): HealthIndicator {
    const healthIndicator = new HealthIndicator(this.gameState.getHealth());
    const margin = this.floor.height * 0.25;
    const width = this.floor.width / 2 - margin * 2;
    const height = this.floor.height - margin * 2;

    healthIndicator.view.setSize(width, height);
    healthIndicator.view.position.set(margin, this.floor.y + margin);
    this.app.stage.addChild(healthIndicator.view);

    return healthIndicator;
  }

  private addPointsIndicator(): PointsIndicator {
    const pointsIndicator = new PointsIndicator();
    const margin = this.floor.height * 0.25;
    const height = this.floor.height - margin * 2;

    pointsIndicator.setFontSize(height);
    pointsIndicator.view.position.set(
      this.floor.width - margin,
      this.floor.y + this.floor.height / 2
    );
    this.app.stage.addChild(pointsIndicator.view);

    return pointsIndicator;
  }
}
