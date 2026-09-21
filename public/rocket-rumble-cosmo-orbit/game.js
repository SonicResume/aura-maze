const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// DOM Cache Elements Hook Registers
const hudName = document.getElementById("hud-name");
const hudTimer = document.getElementById("hud-timer");
const hudScore = document.getElementById("hud-score");
const fuelBar = document.getElementById("fuel-bar");
const usernameInput = document.getElementById("username-input");
const authScreen = document.getElementById("auth-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverTitle = document.getElementById("game-over-title");
const finalName = document.getElementById("final-name");
const finalTime = document.getElementById("final-time");
const finalScore = document.getElementById("final-score");

function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth, 800);
  canvas.height = Math.min(window.innerHeight, 600);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Engine Core Parameters
let pilotName = "GUEST";
let score = 0;
let flightSeconds = 0;
let fuelAmount = 100; // ⛽ Fuel level bounds (0 - 100)
let isEngineOnline = false;
let isGameOver = false;
let asteroidsArray = [];
let fuelPickupsArray = [];
let spawnTimer = 0;
let matchIntervalTracker = null;

// Rocket Object Configuration Matrix
const rocket = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 22,
  height: 40,
  targetX: canvas.width / 2
};

// Input Parameter Handlers
window.addEventListener("mousemove", (e) => {
  if (!isEngineOnline) return;
  const rect = canvas.getBoundingClientRect();
  rocket.targetX = e.clientX - rect.left;
});

window.addEventListener("touchmove", (e) => {
  if (!isEngineOnline) return;
  const rect = canvas.getBoundingClientRect();
  if (e.touches && e.touches[0]) {
    rocket.targetX = e.touches[0].clientX - rect.left;
  }
});

// 🎫 INITIAL ENTRY STEP: Verify Pilot Input
function registerAndLaunchRocket() {
  const inputSignature = usernameInput.value.trim();
  pilotName = inputSignature === "" ? "COMMANDER_" + Math.floor(100 + Math.random() * 900) : inputSignature.toUpperCase();

  hudName.innerText = pilotName;
  authScreen.style.display = "none";
  
  isEngineOnline = true;
  startClockTrackingLoop();
  gameLoop();
}

// ⏱️ CLOCK TRACKING LOOP: Runs core time metrics & continuous fuel burning
function startClockTrackingLoop() {
  if (matchIntervalTracker) clearInterval(matchIntervalTracker);
  
  matchIntervalTracker = setInterval(() => {
    if (isEngineOnline && !isGameOver) {
      flightSeconds++;
      hudTimer.innerText = flightSeconds;

      // ⛽ Fuel Consumption Algorithm
      fuelAmount -= 2.5; 
      updateFuelBarUI();

      if (fuelAmount <= 0) {
        triggerTerminationSequence("OUT_OF_FUEL");
      }
    }
  }, 1000);
}

function updateFuelBarUI() {
  fuelBar.style.width = `${Math.max(0, fuelAmount)}%`;
  if (fuelAmount > 50) {
    fuelBar.style.backgroundColor = "#10b981"; // Green state
  } else if (fuelAmount > 20) {
    fuelBar.style.backgroundColor = "#f59e0b"; // Yellow warning
  } else {
    fuelBar.style.backgroundColor = "#ef4444"; // Red danger
  }
}

// Main 2D Canvas Graphics Engine loop
function gameLoop() {
  if (!isEngineOnline || isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Smooth movement processing vector calculations
  rocket.x += (rocket.targetX - rocket.x) * 0.15;
  // Edge clipping locks
  if (rocket.x < rocket.width) rocket.x = rocket.width;
  if (rocket.x > canvas.width - rocket.width) rocket.x = canvas.width - rocket.width;

  // 🚀 DRAW ROCKET SHIP (Retro Geometric Vector Profile)
  ctx.save();
  ctx.translate(rocket.x, rocket.y);

  // Engine Thruster Flame Animation Stream
  if (Math.random() > 0.3) {
    ctx.beginPath();
    ctx.moveTo(-6, rocket.height / 2);
    ctx.lineTo(0, rocket.height / 2 + Math.random() * 16 + 6);
    ctx.lineTo(6, rocket.height / 2);
    ctx.closePath();
    ctx.fillStyle = "#f59e0b"; // Flame Amber
    ctx.fill();
  }

  // Rocket Body Core
  ctx.beginPath();
  ctx.moveTo(0, -rocket.height / 2); // Nose cone apex
  ctx.lineTo(-rocket.width / 2, rocket.height / 2);
  ctx.lineTo(rocket.width / 2, rocket.height / 2);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = "#38bdf8"; // Neon trim highlight
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Asteroid & Fuel generation ticks
  spawnTimer++;
  if (spawnTimer % 28 === 0) {
    // Generate Falling Asteroids
    asteroidsArray.push({
      x: Math.random() * (canvas.width - 50) + 25,
      y: -30,
      speed: Math.random() * 4 + 3,
      radius: Math.random() * 14 + 12
    });

    // Rare chance to generate green Fuel Cells containers
    if (Math.random() > 0.72) {
      fuelPickupsArray.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: -30,
        speed: 3.5,
        size: 12
      });
    }
  }

  // Processing Falling Asteroids matrix loops
  for (let i = asteroidsArray.length - 1; i >= 0; i--) {
    const ast = asteroidsArray[i];
    ast.y += ast.speed;

    ctx.beginPath();
    ctx.arc(ast.x, ast.y, ast.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#475569";
    ctx.fill();
    ctx.strokeStyle = "#1e293b";
    ctx.stroke();

    // Check hit boundary box parameter conditions (Rocket crashed into Asteroid)
    const distanceToAst = Math.hypot(rocket.x - ast.x, rocket.y - ast.y);
    if (distanceToAst < ast.radius + (rocket.width / 2)) {
      triggerTerminationSequence("CRITICAL_IMPACT");
    }

    if (ast.y > canvas.height + 40) {
      asteroidsArray.splice(i, 1);
      score += 5; // Gain score points simply for dodging successfully
      hudScore.innerText = score;
    }
  }

  // Processing Fuel Cell collections items
  for (let i = fuelPickupsArray.length - 1; i >= 0; i--) {
    const cell = fuelPickupsArray[i];
    cell.y += cell.speed;

    // Draw Glowing Fuel Node item
    ctx.beginPath();
    ctx.rect(cell.x - cell.size/2, cell.y - cell.size/2, cell.size, cell.size);
    ctx.fillStyle = "#10b981"; // Emerald green asset
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#10b981";
    ctx.fill();
    ctx.shadowBlur = 0; // Reset canvas filter buffers immediately

    // Collision check: Rocket picks up fuel cell container element
    const distanceToCell = Math.hypot(rocket.x - cell.x, rocket.y - cell.y);
    if (distanceToCell < cell.size + (rocket.height / 2)) {
      fuelAmount = Math.min(100, fuelAmount + 25); // Refuel ship state parameter array values
      updateFuelBarUI();
      fuelPickupsArray.splice(i, 1);
      score += 15; // Bonus points for harvesting
      hudScore.innerText = score;
      continue;
    }

    if (cell.y > canvas.height + 40) fuelPickupsArray.splice(i, 1);
  }

  requestAnimationFrame(gameLoop);
}

// 🏁 TERMINATION DISPATCHER MATRIX
function triggerTerminationSequence(condition) {
  isGameOver = true;
  clearInterval(matchIntervalTracker);

  if (condition === "OUT_OF_FUEL") {
    gameOverTitle.innerText = "PROPULSION ENGINE DEPLETED";
    gameOverTitle.style.color = "#fbbf24"; // Amber danger indicator
  } else {
    gameOverTitle.innerText = "HULL CRITICAL IMPACT";
    gameOverTitle.style.color = "#ef4444"; // Red structural failure indicator
  }

  finalName.innerText = pilotName;
  finalTime.innerText = flightSeconds;
  finalScore.innerText = score;
  gameOverScreen.style.display = "flex";
}

// 🔄 RESET CONTROLLER: Wipes cache vectors and releases page loops cleanly
function resetGameEngine() {
  score = 0;
  flightSeconds = 0;
  fuelAmount = 100;
  isGameOver = false;
  asteroidsArray = [];
  fuelPickupsArray = [];
  spawnTimer = 0;
  rocket.x = canvas.width / 2;
  rocket.targetX = canvas.width / 2;
  
  hudScore.innerText = "0";
  hudTimer.innerText = "0";
  updateFuelBarUI();
  gameOverScreen.style.display = "none";
  
  startClockTrackingLoop();
  gameLoop();
}
