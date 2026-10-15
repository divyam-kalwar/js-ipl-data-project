// Find the bowler with the best economy in super overs

function bestEconomySuperOver(deliveries) {
    const superOverStats = {};

    // Collect runs conceded and legal balls for each bowler
    for (const delivery of deliveries) {
        if (delivery.is_super_over === '1') {
            const bowler = delivery.bowler;

            if (!superOverStats[bowler]) {
                superOverStats[bowler] = { runs: 0, balls: 0 };
            }

            const totalRuns = Number(delivery.total_runs || 0);
            const byes = Number(delivery.bye_runs || 0);
            const legbyes = Number(delivery.legbye_runs || 0);
            const penalty = Number(delivery.penalty_runs || 0);

            superOverStats[bowler].runs += totalRuns - byes - legbyes - penalty;

            const wides = Number(delivery.wide_runs || 0);
            const noballs = Number(delivery.noball_runs || 0);

            if (wides === 0 && noballs === 0) {
                superOverStats[bowler].balls++;
            }
        }
    }

    let bestBowler = null;
    let bestEconomy = Infinity;

    // Find the bowler with the lowest economy rate
    for (const bowler in superOverStats) {
        const stats = superOverStats[bowler];

        if (stats.balls > 0) {
            const economy = stats.runs / (stats.balls / 6);

            if (economy < bestEconomy) {
                bestEconomy = economy;
                bestBowler = {
                    bowler,
                    economy: Number(economy.toFixed(2))
                };
            }
        }
    }

    return bestBowler;
}

module.exports = bestEconomySuperOver;