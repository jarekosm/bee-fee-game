import { Application } from 'pixi.js';
import { Knight } from '../worldItems';
import { preload, setup } from './setup';

export class World {
  private constructor(private readonly app: Application) {
    this.addKnight();
  }

  static async create(): Promise<World> {
    const app = await setup();
    await preload();
    return new World(app);
  }

  private addKnight(): void {
    const knight = new Knight();
    this.app.stage.addChild(knight.view);
  }
}
