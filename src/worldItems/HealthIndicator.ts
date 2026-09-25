import { Container, Graphics } from 'pixi.js';

export class HealthIndicator {
  public readonly view = new Container();
  private readonly maxHealth: number;
  private readonly currentFillIndicator = new Graphics();

  constructor(maxHealth: number) {
    this.maxHealth = maxHealth;
    this.view.addChild(new Graphics().rect(0, 0, maxHealth, 1).fill({ color: 0x000000 }));
    this.view.addChild(this.currentFillIndicator);
    this.setHealth(maxHealth);
  }

  public setHealth(health: number): void {
    const width = Math.max(0, Math.min(health, this.maxHealth));

    this.currentFillIndicator.clear().rect(0, 0, width, 1).fill({ color: 0xff0000 });
  }
}
