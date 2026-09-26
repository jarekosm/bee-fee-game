import { Container, Text } from 'pixi.js';

export class Announcement {
  public readonly view = new Container();
  private readonly title: Text;
  private readonly subtitle: Text;

  constructor() {
    this.title = new Text({
      text: 'Łapanie jedzonka',
      anchor: { x: 0.5, y: 0 },
      style: { fontSize: 48, fontWeight: 'bold' },
    });
    this.subtitle = new Text({
      text: 'Zacznij poruszać bohaterem, aby zacząć grę!',
      anchor: { x: 0.5, y: 0 },
      style: { fontSize: 20 },
    });

    this.subtitle.y = this.title.height + 12;

    this.view.addChild(this.title, this.subtitle);
  }
  public setText(title: string, subtitle: string): void {
    this.title.text = title;
    this.subtitle.text = subtitle;
  }

  public removeText(): void {
    this.title.text = '';
    this.subtitle.text = '';
  }
}
