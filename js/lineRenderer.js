class LineRenderer {
  constructor(context, startPos, endPos) {
    this.context = context;

    this.startPos = startPos || new Vector2D(0, 0);
    this.endPos = endPos || new Vector2D(0, 0);

    this.direction = new Vector2D(0, 0);
    this.shouldDrawLine = false;

    this.lineLength = 20;
    this.lineColor = '#ff0';
  }

  draw() {
    if (this.shouldDrawLine) {
      this.drawLine();
    }
  }

  drawLine() {
    this.context.beginPath();

    this.context.setLineDash([5, 15]);
    this.context.moveTo(this.startPos.x, this.startPos.y);
    this.context.lineTo(
      this.startPos.x + this.direction.x * this.lineLength,
      this.startPos.y + this.direction.y * this.lineLength
    );

    this.context.strokeStyle = this.lineColor;
    this.context.lineWidth = 2;
    this.context.stroke();
  }

  setLine(start, dir) {
    this.shouldDrawLine = true;

    this.startPos = start;
    this.direction = dir;
  }
}
