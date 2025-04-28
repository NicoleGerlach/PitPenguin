
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
  
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  
    createParticles() {
      for (let i=0; i<this.particleCount; i++) {
        // Alle Partikel starten unten links (z.B. bei x=50, y=height-50)
        const startX = window.innerWidth / 2; // mittig Bildschirmbreite
        const startY = window.innerHeight -5; // 10px über unterem Rand
        const angleDeg = Math.random() * 60 + 60; // zwischen 60° und 120°
        const speed = Math.random() * 5 + 4;
  
        const angleRad = angleDeg * Math.PI / 180;

        this.particles.push({
            x: startX,
            y: startY,
            size: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            speedX: Math.cos(angleRad) * speed,
            speedY: -Math.sin(angleRad) * speed,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.02 - 0.01,
            gravity: 0.05 + Math.random() * 0.05
        });
      }
      this.isRunning = true;
      this.animate();
    }
  
    animate() {
      if (!this.isRunning) return;
  
      requestAnimationFrame(() => this.animate());
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
      for (let p of this.particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity; // Schwerkraft wirkt nach unten
        p.rotation += p.rotationSpeed;
  
        // Partikel außerhalb des Bildschirms neu positionieren oder entfernen
        if (p.y > window.innerHeight + p.size || p.x < -p.size || p.x > window.innerWidth + p.size) {
          // Optional: Entfernen oder neu starten
          // Für einmaligen Effekt kannst du sie auch einfach entfernen:
          continue;
        }
  
        // Zeichnen
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        this.ctx.restore();
      }
  
      // Stoppen nach einer Weile (z.B. wenn alle Partikel unten sind)
      if (this.particles.every(p => p.y > window.innerHeight + p.size)) {
        this.isRunning = false;
      }
    }
  }