export enum EGameEvent {
  START = 'start',
  GAME_OVER = 'gameOver',
  CHANGE = 'change',
}

export class GameState extends EventTarget {
  private health = 0;
  private points = 0;
  private started = false;

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
    this.notify(EGameEvent.CHANGE);
  }

  private notify(event: EGameEvent): void {
    this.dispatchEvent(new Event(event));
  }
}
