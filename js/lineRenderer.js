class LineRenderer {
  constructor(context, startPos, endPos) {
    this.context = context;

    this.startPos = startPos || new Vector2D(0, 0);
    this.endPos = endPos || new Vector2D(0, 0);

    this.direction = new Vector2D(0, 0);
    this.shouldDrawLine = false;
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
      this.startPos.x + this.direction.x * 20,
      this.startPos.y + this.direction.y * 20
    );
    this.context.strokeStyle = '#d00';
    this.context.lineWidth = 2;
    this.context.stroke();
  }

  drawCircle() {
    this.context.beginPath();

    var arcCenter = this.startPos.add(this.direction.normal().multiply(200));
    console.log(arcCenter);
    this.context.arc(arcCenter.x, arcCenter.y, 200, (-90 * Math.PI) / 180, 0);
    this.context.stroke();
  }

  setLine(start, dir) {
    this.shouldDrawLine = true;

    this.startPos = start;
    this.direction = dir;
  }
}
