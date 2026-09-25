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
    this.dispatchEvent(new Event('start'));
  }

  public addPoint(): void {
    this.points++;
    this.notify();
  }

  public removeHealth(): void {
    if (this.health <= 0) {
      return;
    }

    this.health--;
    this.notify();

    if (this.health <= 0) {
      this.dispatchEvent(new Event('gameOver'));
    }
  }

  public isGameOver(): boolean {
    return this.health <= 0;
  }

  public reset(): void {
    this.health = this.initialHealth;
    this.points = 0;
    this.started = false;
    this.notify();
  }

  private notify(): void {
    this.dispatchEvent(new Event('change'));
  }
}
