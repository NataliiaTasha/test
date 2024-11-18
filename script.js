
const canvas = document.getElementById("lightsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lights = [];
const lightCount = 50;

// Створення лампочок
function createLights() {
    for (let i = 0; i < lightCount; i++) {
        lights.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 10 + 5,
            depth: Math.random(), // Глибина
            glow: Math.random() * 0.5 + 0.5,
        });
    }
}

// Малювання лампочок
function drawLights() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let light of lights) {
        const gradient = ctx.createRadialGradient(
            light.x, light.y, 0,
            light.x, light.y, light.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${light.glow})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

// Ефект відштовхування мишкою
canvas.addEventListener("mousemove", (e) => {
    for (let light of lights) {
        const dx = e.clientX - light.x;
        const dy = e.clientY - light.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            light.x -= dx / 10;
            light.y -= dy / 10;
        }
    }
});

// Ефект скролінгу
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    for (let light of lights) {
        light.radius += scrollTop * 0.001;
        light.glow = Math.max(0.5, light.glow - scrollTop * 0.0001);
    }
});

// Анімація
function animate() {
    drawLights();
    requestAnimationFrame(animate);
}

createLights();
animate();

canvas.addEventListener("click", (e) => {
    for (let light of lights) {
        const dx = e.clientX - light.x;
        const dy = e.clientY - light.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < light.radius) {
            alert(`Light clicked at depth: ${light.depth}`);
            break;
        }
    }
});

canvas.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    for (let light of lights) {
        const dx = touch.clientX - light.x;
        const dy = touch.clientY - light.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            light.x -= dx / 10;
            light.y -= dy / 10;
        }
    }
});
