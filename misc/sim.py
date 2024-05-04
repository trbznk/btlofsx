import random

SIMS_COUNT = 1_000_000
EVENTS = ["football", "ballet"]
STRATEGIES = [
    {
        "m": [0.01, 0.99],
        "f": [0.25, 0.75],
    },
]

for strategy in STRATEGIES:
    print(strategy["m"])
    print(strategy["f"])
    m_results = []
    f_results = []
    for _ in range(SIMS_COUNT):
        m_choice = random.choices(EVENTS, weights=strategy["m"])[0]
        f_choice = random.choices(EVENTS, weights=strategy["f"])[0]
        if m_choice == f_choice:
            m_payoff = 3 if m_choice == "football" else 2
            f_payoff = 2 if f_choice == "football" else 3
            m_results.append(m_payoff)
            f_results.append(f_payoff)
        else:
            if m_choice == "football": m_results.append(1)
            else:                      m_results.append(0)
            if f_choice == "football": f_results.append(0)
            else:                      f_results.append(1)

    assert len(m_results) == len(f_results)
    print("m_payoff", sum(m_results)/len(m_results))
    print("f_payoff", sum(f_results)/len(f_results))
    print("-"*80)
