export default class ConicGradientFillAnimation {
  constructor(
    node,
    { duration, fillColor = "transparent", innerColor = "black" },
    onUpdateHandler = () => {},
    onFinish = () => {}
  ) {
    this.node = node;

    this.duration = duration;
    this.fillColor = fillColor;
    this.innerColor = innerColor;
    this.onUpdateHandler = onUpdateHandler;
    this.onFinish = onFinish;
  }

  start() {
    this.initialTime = performance.now();
    this.frameId = requestAnimationFrame(this.update.bind(this));
  }

  update(now) {
    const progress = Math.min((now - this.initialTime) / this.duration, 1);
    this.onUpdateHandler(progress)
    this.onProgress(progress);

    if (progress < 1) {
      this.frameId = requestAnimationFrame(this.update.bind(this));
    } else {
      this.onFinish();
    }
  }

  onProgress(progress) {
    const angle = progress * 360;
    this.node.style.backgroundImage = `conic-gradient(${this.fillColor} 0deg ${angle}deg, ${this.innerColor} ${angle}deg)`;
  }

  stop() {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this.initialTime = null;
  }
}
