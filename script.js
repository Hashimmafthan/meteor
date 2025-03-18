const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
const meteors = [];
const bombs = [];
const meteorImage = new Image();
meteorImage.src = "meteor.png"; // Replace with your meteor image URL
const bombImage = new Image();
bombImage.src = "bomb.png"; // Replace with your bomb image URL

// Meteorite class
class Meteor {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = 30;
    }

    draw() {
        ctx.drawImage(meteorImage, this.x, this.y, 50, 50);
    }

    update() {
        this.y += this.speed;
    }
}

// Bomb class
class Bomb {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = 30;
    }

    draw() {
        ctx.drawImage(bombImage, this.x, this.y, 50, 50);
    }

    update() {
        this.y += this.speed;
    }
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update meteors
    meteors.forEach((meteor, index) => {
        meteor.update();
        meteor.draw();

        if (meteor.y > canvas.height) {
            meteors.splice(index, 1);
        }
    });

    // Draw and update bombs
    bombs.forEach((bomb, index) => {
        bomb.update();
        bomb.draw();

        if (bomb.y > canvas.height) {
            bombs.splice(index, 1);
        }
    });

    requestAnimationFrame(gameLoop);
}

// Spawn meteors
function spawnMeteor() {
    const x = Math.random() * (canvas.width - 50);
    meteors.push(new Meteor(x, 0, Math.random() * 3 + 2));
}

// Spawn bombs
function spawnBomb() {
    const x = Math.random() * (canvas.width - 50);
    bombs.push(new Bomb(x, 0, Math.random() * 3 + 2));
}

// Handle Click Events
canvas.addEventListener("click", (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    // Check if meteor is clicked
    meteors.forEach((meteor, index) => {
        const distance = Math.sqrt((clickX - meteor.x) ** 2 + (clickY - meteor.y) ** 2);
        if (distance < meteor.radius) {
            meteors.splice(index, 1);
            score++;
            document.getElementById("score").innerText = `Score: ${score}`;
        }
    });

    // Check if bomb is clicked
    bombs.forEach((bomb) => {
        const distance = Math.sqrt((clickX - bomb.x) ** 2 + (clickY - bomb.y) ** 2);
        if (distance < bomb.radius) {
            alert("Game Over! Your Score: " + score);
            location.reload();
        }
    });
});

// Start the game
setInterval(spawnMeteor, 1000);
setInterval(spawnBomb, 3000);
gameLoop();
