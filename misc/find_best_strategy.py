import random

SIMS_COUNT = 10_000
EVENTS = ["football", "ballet"]

best_strategy = None
best = 0
for s in range(1_000):
    p = random.random()
    q = 1/4
    results = []
    for _ in range(SIMS_COUNT):
        m_choice = random.choices(EVENTS, weights=[p, 1-p])[0]
        f_choice = random.choices(EVENTS, weights=[q, 1-q])[0]
        if m_choice == f_choice:
            payoff = 3 if m_choice == "football" else 2
            results.append(payoff)
        elif m_choice == "football": 
            results.append(1)
        else:
            results.append(0)

    mean_payoff = sum(results)/len(results)
    if mean_payoff > best:
        best_strategy = (p, 1-p)
        best = mean_payoff
        print(f"{best:.4f} p={best_strategy[0]:.2f} (1-p)={best_strategy[1]:.2f}")
