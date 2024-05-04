async function main() {
    const N_SIMS = 250;
    let RESULTS = [[],[]];
    let TIMEOUT = 10;

    let pm = parseFloat(document.getElementById("pm_input").value)/100;
    let pf = 1-parseFloat(document.getElementById("pf_input").value)/100;

    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    
    for (let i = 0; i < N_SIMS+1; i++) {
        let m = Math.random();
        let f = Math.random();
        if (m <= pm && f <= pf) {
            RESULTS[0].push(3);
            RESULTS[1].push(2);
        } else if (m > pm && f > pf) {
            RESULTS[0].push(2);
            RESULTS[1].push(3);
        } else {
            if (m <= pm) {
                RESULTS[0].push(1);
            } else {
                RESULTS[0].push(0);
            }
            if (f <= pf) {
                RESULTS[1].push(0);
            } else {
                RESULTS[1].push(1);
            }
        }
    }

    let RESULTS_CUMSUM = [[],[]];
    for (let i = 0; i < N_SIMS; i++) {
        if (i == 0) {
            RESULTS_CUMSUM[0].push(RESULTS[0][i]);
            RESULTS_CUMSUM[1].push(RESULTS[1][i]);
        } else {
            RESULTS_CUMSUM[0].push(RESULTS_CUMSUM[0][i-1] + RESULTS[0][i]);
            RESULTS_CUMSUM[1].push(RESULTS_CUMSUM[1][i-1] + RESULTS[1][i]);
        }
    }

    let simulations_span = document.getElementById("simulations");
    for (let frame = 0; frame < N_SIMS; frame++) {
        simulations_span.innerHTML = frame+1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        let max_y_value = Math.max(RESULTS_CUMSUM[0][frame-1], RESULTS_CUMSUM[1][frame-1]);
        let x_grid_size = (canvas.width)/frame;
        let y_grid_size = ((4/5)*canvas.height)/max_y_value;
        for (let g = 0; g < 2; g++) {
            ctx.beginPath();
            ctx.strokeStyle = ["green", "blue"][g];
            let payoff_span = [document.getElementById("payoff_m"), document.getElementById("payoff_f")][g];
            for (let i = 0; i < frame; i++) {
                let x = i*x_grid_size;
                let y = canvas.height - RESULTS_CUMSUM[g][i]*y_grid_size;
                payoff_span.innerHTML = (RESULTS_CUMSUM[g][i] / (i+1)).toFixed(2);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        await new Promise(r => setTimeout(r, TIMEOUT));
    }
}
            
            
            