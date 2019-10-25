class Audio {
  constructor() {
    this.element = document.createElement('audio');
  }

  backgroundSound(src) {
    this.bgSound = document.createElement('audio');
    this.bgSound.setAttribute('src', src);
    this.bgSound.setAttribute('preload', 'auto');
    this.bgSound.setAttribute('controls', 'none');
    this.bgSound.style.display = 'none';
    this.bgSound.loop = true;

    document.body.appendChild(this.bgSound);
    this.bgSound.play();
  }
}
