// Find the bowler with the best economy in super overs

function bestEconomySuperOver(deliveries) {
    if (!Array.isArray(deliveries)) {
        throw new TypeError("Input must be an array");
    }

    // Collect runs conceded and legal balls for each bowler
    const superOverStats = deliveries.reduce((acc, delivery) => {
        if (delivery.is_super_over !== "1") {
            return acc;
        }

        const bowler = delivery.bowler;

        acc[bowler] ??= { runs: 0, balls: 0 };

        const totalRuns = Number(delivery.total_runs || 0);
        const byes = Number(delivery.bye_runs || 0);
        const legbyes = Number(delivery.legbye_runs || 0);
        const penalty = Number(delivery.penalty_runs || 0);

        acc[bowler].runs += totalRuns - byes - legbyes - penalty;

        const wides = Number(delivery.wide_runs || 0);
        const noballs = Number(delivery.noball_runs || 0);

        if (wides === 0 && noballs === 0) {
            acc[bowler].balls++;
        }

        return acc;
    }, {});

    // Find the bowler with the lowest economy
    return Object.entries(superOverStats).reduce((best, [bowler, stats]) => {
        if (stats.balls === 0) {
            return best;
        }

        const economy = stats.runs / (stats.balls / 6);

        if (best === null || economy < best.economy) {
            return {
                bowler,
                economy: Number(economy.toFixed(2))
            };
        }

        return best;
    }, null);
}

module.exports = bestEconomySuperOver;