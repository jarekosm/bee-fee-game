export type TKey = 'left' | 'right';

const keyMap: Record<string, TKey> = {
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
};

export class Keyboard {
  private readonly keys: Record<TKey, { isPressed: boolean }> = Object.freeze({
    left: { isPressed: false },
    right: { isPressed: false },
  });

  constructor() {
    window.addEventListener('keydown', event => this.keydownHandler(event));
    window.addEventListener('keyup', event => this.keyupHandler(event));
  }

  public getKeyPressed(): TKey | undefined {
    const pressedKeys = Object.entries(this.keys)
      .filter(([, { isPressed }]) => isPressed)
      .map(([key]) => key);

    return pressedKeys.length === 1 ? (pressedKeys[0] as TKey) : undefined;
  }

  private keydownHandler(event: KeyboardEvent): void {
    const key = keyMap[event.code as keyof typeof keyMap];

    if (!key) return;

    this.keys[key].isPressed = true;
  }

  private keyupHandler(event: KeyboardEvent): void {
    const key = keyMap[event.code as keyof typeof keyMap];

    if (!key) return;

    this.keys[key].isPressed = false;
  }
}
