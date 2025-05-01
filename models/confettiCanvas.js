/**
 * Represents a confetti animation.
 */
class Confetti {

  /**
    * Creates an instance of the Confetti class.
    * 
    * @param {string} confettiCanvas - The ID of the canvas element for rendering.
    * @param {number} [particleCount=100] - The number of particles to generate.
    */
  constructor(confettiCanvas, particleCount = 100) {
    this.canvas = document.getElementById(confettiCanvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = particleCount;
    this.isRunning = false;
    this.angleMin = 60;
    this.angleRange = 60;
    this.speedMin = 4;
    this.speedRange = 8;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  /**
  * Resizes the canvas to fill the window.
  */
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
  * Creates particles at the starting position and begins the animation.
  */
  createParticles() {
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight - 5;
    for (let i = 0; i < this.particleCount; i++) {
      const angleDeg = Math.random() * this.angleRange + this.angleMin;
      const speed = Math.random() * this.speedRange + this.speedMin;
      this.particles.push(this.generateParticle(startX, startY, angleDeg, speed));
    }
    this.isRunning = true;
    this.animate();
  }

  /**
   * Generates a single particle with specified parameters.
   * 
   * @param {number} startX - Starting X position.
   * @param {number} startY - Starting Y position.
   * @param {number} angleDeg - Emission angle in degrees.
   * @param {number} speed - Initial speed of the particle.
   * @returns {Object} Particle object with properties for position, velocity, color, rotation, etc.
   */
  generateParticle(startX, startY, angleDeg, speed) {
    const angleRad = angleDeg * Math.PI / 180;
    return {
      x: startX,
      y: startY,
      size: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      speedX: Math.cos(angleRad) * speed,
      speedY: -Math.sin(angleRad) * speed,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.02 - 0.01,
      gravity: 0.05 + Math.random() * 0.05
    };
  }

  /**
   * Main animation loop that clears the canvas and updates particles each frame.
   */
  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    if (this.particles.every(p => p.y > window.innerHeight + p.size)) {
      this.isRunning = false;
    }
  }

  /**
   * Updates positions and renders each particle.
   */
  updateParticles() {
    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity;
      p.rotation += p.rotationSpeed;
      if (p.y > window.innerHeight + p.size || p.x < -p.size || p.x > window.innerWidth + p.size) continue;
      this.renderParticle(p);
    }
  }

  /**
   * Renders a single particle on the canvas based on its properties.
   * 
   * @param {Object} p - Particle object containing position, size, color, rotation etc.
   */
  renderParticle(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotation);
    this.ctx.fillStyle = p.color;
    this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    this.ctx.restore();
  }
}