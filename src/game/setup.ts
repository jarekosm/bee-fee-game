import { Application, Assets } from 'pixi.js';
import { CONFIG } from '../config';

export async function setup(): Promise<Application> {
  const app = new Application();

  await app.init({
    width: CONFIG.world.width,
    height: CONFIG.world.height,
    background: CONFIG.world.backgroundColor,
  });

  document.getElementById('pixi-container')!.appendChild(app.canvas);

  return app;
}

export async function preload(): Promise<void> {
  const assets: { alias: string; src: string }[] = Object.values(CONFIG.assets).map(
    ({ alias, src }) => ({
      alias,
      src: `/assets/game-world/${src}`,
    })
  );

  await Assets.load(assets);
}
