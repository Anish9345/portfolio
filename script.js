/* =====================================
   MAXIMUM ELITE VERSION - FULL SCRIPT
   Smooth • Scroll Safe • Optimized
===================================== */

/* ========= 1. SCROLL SAFE TYPING ANIMATION ========= */
const roles = [
  "Cyber Security Specialist",
  "AI Developer",
  "Malware Analyst",
  "Game Development Minor"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let typingSpeed = 90;

const typingElement = document.getElementById("typing");

function startTyping() {
  if (!typingElement) return;

  const currentText = roles[roleIndex];

  if (!deleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      deleting = true;
      typingSpeed = 1200; // pause before delete
    } else {
      typingSpeed = 90;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(startTyping, typingSpeed);
}

window.addEventListener("load", startTyping);


/* ========= 2. INTERSECTION OBSERVER REVEAL ========= */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


/* ========= 3. SCROLL PROGRESS BAR ========= */
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;

  const bar = document.getElementById("progressBar");
  if (bar) bar.style.width = progress + "%";
});


/* ========= 4. 3D TILT CARD EFFECT ========= */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});


/* ========= 5. LIGHTWEIGHT PARTICLE BACKGROUND ========= */
const canvas = document.createElement("canvas");
canvas.id = "particles-bg";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = "rgba(56,189,248,0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


/* ========= 6. CUSTOM GLOW CURSOR ========= */
const cursor = document.createElement("div");
cursor.style.width = "15px";
cursor.style.height = "15px";
cursor.style.borderRadius = "50%";
cursor.style.background = "#38bdf8";
cursor.style.position = "fixed";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "3000";
cursor.style.boxShadow = "0 0 20px #38bdf8";
document.body.appendChild(cursor);

window.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX - 7 + "px";
  cursor.style.top = e.clientY - 7 + "px";
});