const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.createElement("div");
document.body.appendChild(scoreDisplay);
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "10px";
scoreDisplay.style.right = "10px";
scoreDisplay.style.fontSize = "20px";
scoreDisplay.style.fontWeight = "bold";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let circles = [];

class Circle {
    constructor(x, radius, color, speedY) {
        this.x = x;
        this.y = -radius; // Inicia arriba del canvas
        this.radius = radius;
        this.color = color;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.y += this.speedY;
    }
}

function spawnCircle() {
    let radius = Math.random() * 20 + 20;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let speedY = Math.random() * 3 + 1;
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    circles.push(new Circle(x, radius, color, speedY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle, index) => {
        circle.move();
        circle.draw();
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    circles = circles.filter(circle => {
        const dx = mouseX - circle.x;
        const dy = mouseY - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > circle.radius) {
            return true;
        } else {
            score++;
            scoreDisplay.textContent = `Puntuación: ${score}`;
            return false;
        }
    });
});

setInterval(spawnCircle, 1000);
animate();
