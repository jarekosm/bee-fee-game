export class Sounds {
  private readonly context = new AudioContext();

  constructor() {
    window.addEventListener('keydown', () => {
      if (this.context.state === 'suspended') {
        void this.context.resume();
      }
    });
  }

  public playCollect(): void {
    this.beep(880, 0.08);
  }

  public playHurt(): void {
    this.beep(180, 0.15);
  }

  public playGameOver(): void {
    this.beep(110, 0.5);
  }

  private beep(frequency: number, duration: number): void {
    if (this.context.state === 'suspended') {
      void this.context.resume();
    }

    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const start = this.context.currentTime;

    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(this.context.destination);
    gain.gain.setValueAtTime(0.2, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.start(start);
    oscillator.stop(start + duration);
  }
}
