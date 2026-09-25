import { CONFIG } from '../config';

export enum EGameEvent {
  START = 'start',
  GAME_OVER = 'gameOver',
  CHANGE = 'change',
  LEVEL_UP = 'levelUp',
}

export class GameState extends EventTarget {
  private health = 0;
  private points = 0;
  private started = false;
  private level = 1;
  private foodSpeed = CONFIG.world.foodStartSpeed;
  private foodAmount = CONFIG.world.foodStartAmount;

  constructor(private readonly initialHealth: number) {
    super();
    this.health = this.initialHealth;
  }

  public getHealth(): number {
    return this.health;
  }

  public getPoints(): number {
    return this.points;
  }

  public getLevel(): number {
    return this.level;
  }

  public getFoodSpeed(): number {
    return this.foodSpeed;
  }

  public getFoodAmount(): number {
    return this.foodAmount;
  }

  public upgradeFood(upgrade: 'speed' | 'amount'): void {
    if (upgrade === 'speed') {
      this.foodSpeed += 0.5;
      return;
    }

    this.foodAmount++;
  }

  public isStarted(): boolean {
    return this.started;
  }

  public start(): void {
    if (this.started) {
      return;
    }

    this.started = true;
    this.notify(EGameEvent.START);
  }

  public addPoint(): void {
    this.points++;
    this.notify(EGameEvent.CHANGE);

    if (this.points % CONFIG.world.levelUpPoints === 0) {
      this.level++;
      this.notify(EGameEvent.LEVEL_UP);
    }
  }

  public removeHealth(): void {
    if (this.health <= 0) {
      return;
    }

    this.health--;
    this.notify(EGameEvent.CHANGE);

    if (this.health <= 0) {
      this.notify(EGameEvent.GAME_OVER);
    }
  }

  public isGameOver(): boolean {
    return this.health <= 0;
  }

  public reset(): void {
    this.health = this.initialHealth;
    this.points = 0;
    this.started = false;
    this.level = 1;
    this.foodSpeed = CONFIG.world.foodStartSpeed;
    this.foodAmount = CONFIG.world.foodStartAmount;
    this.notify(EGameEvent.CHANGE);
  }

  private notify(event: EGameEvent): void {
    this.dispatchEvent(new Event(event));
  }
}
