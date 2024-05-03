const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");
const N_SIMS = 1000;
const X_GRID_SIZE = canvas.width/N_SIMS;
const Y_GRID_SIZE = 1.5*canvas.height/N_SIMS;

console.log(canvas.width, canvas.height);
console.log(X_GRID_SIZE, Y_GRID_SIZE)

// probability to go to the football stadium
let pm = 0.75;
let pf = 0.25;

let meets = 0;
let results = [];
for (let i = 0; i < N_SIMS; i++) {
    let m = Math.random();
    let f = Math.random();

    if (m <= pm && f <= pf || m > pm && f > pf) {
        meets++;
    }
    results.push(meets);

    xLast = i * X_GRID_SIZE;
    yLast = canvas.height- (results[i-1] * Y_GRID_SIZE);
    xNext = (i+1) * X_GRID_SIZE;
    yNext = canvas.height - (results[i] * Y_GRID_SIZE);
    ctx.beginPath();
    ctx.moveTo(xLast, yLast);
    ctx.lineTo(xNext, yNext);
    ctx.stroke();
}

console.log(results);
