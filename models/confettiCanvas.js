/**
 * Creates a confetti parade on a canvas element.
 * It generates random particles, moves them according to their properties,
 * and draws them on the canvas to simulate a confetti effect.
 */
class Confetti {
    constructor(confettiCanvas, particleCount = 100) {
      this.canvas = document.getElementById(confettiCanvas);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = particleCount;
      this.isRunning = false; // Steuerung für einmaliges Starten
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  
    /**
     * Resize the canvas to fit the window size.
     */
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    /**
     * Creates particles and starts the animation.
     */
    createParticles() {
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight -5;
      for (let i=0; i<this.particleCount; i++) {
        this.particles.push(this.generateParticle(startX, startY));
      }
      this.isRunning = true;
      this.animate();
    }

    /**
     * Generates a single particle with random properties.
     * 
     * @param {number} startX - Starting position x.
     * @param {number} startY - Starting position y.
     * @returns {Object} - The particle object with properties.
     */
    generateParticle(startX, startY) {
      const angleDeg = Math.random() * 60 + 60;
      const speed = Math.random() * 8 + 4;
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
     * Animation loop for moving and drawing particles.
     */
    animate() {
      if (!this.isRunning) return;
      requestAnimationFrame(() => this.animate());
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let p of this.particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        if (p.y > window.innerHeight + p.size || p.x < -p.size || p.x > window.innerWidth + p.size) {
          continue;
        }
        this.renderParticle(p);
      }
      if (this.particles.every(p => p.y > window.innerHeight + p.size)) {
        this.isRunning = false;
      }
    }

    /**
     * Draws a single particle on the canvas.
     * 
     * @param {Object} p - The particle object with properties.
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