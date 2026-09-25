import { Container, Text } from 'pixi.js';

export class PointsIndicator {
  public readonly view = new Container();
  private readonly currentPointsIndicator = new Text({
    text: '',
    anchor: { x: 1, y: 0.5 },
    style: { fill: 0xffffff },
  });

  constructor() {
    this.view.addChild(this.currentPointsIndicator);
    this.setPoints(0);
  }

  public setFontSize(fontSize: number): void {
    this.currentPointsIndicator.style.fontSize = fontSize;
  }

  public setPoints(points: number): void {
    this.currentPointsIndicator.text = `${points} pkt`;
  }
}
