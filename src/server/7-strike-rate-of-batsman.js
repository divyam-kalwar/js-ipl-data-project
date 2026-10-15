// Find the strike rate of a batsman for each season

function strikeRate(matches, deliveries) {
    const batsmanStats = {};
    const matchSeason = {};

    if (!Array.isArray(matches) || !Array.isArray(deliveries)) {
        throw new TypeError("Input must be array");
    }

    // Map seasons to match IDs
    for (const match of matches) {
        if (!matchSeason[match.season]) {
            matchSeason[match.season] = [];
        }
        matchSeason[match.season].push(Number(match.id));
    }

    // Calculate runs and balls faced
    for (const delivery of deliveries) {
        const batsman = delivery.batsman;
        const runs = Number(delivery.batsman_runs || 0);

        for (const season in matchSeason) {
            if (matchSeason[season].includes(Number(delivery.match_id))) {
                if (!batsmanStats[season]) {
                    batsmanStats[season] = {};
                }

                if (!batsmanStats[season][batsman]) {
                    batsmanStats[season][batsman] = { runs: 0, balls: 0 };
                }

                batsmanStats[season][batsman].runs += runs;

                if (Number(delivery.wide_runs || 0) === 0) {
                    batsmanStats[season][batsman].balls++;
                }
            }
        }
    }

    // Calculate strike rate
    const strikeRateOfBatsman = {};

    for (const season in batsmanStats) {
        strikeRateOfBatsman[season] = {};

        for (const batsman in batsmanStats[season]) {
            const stats = batsmanStats[season][batsman];

            strikeRateOfBatsman[season][batsman] = stats.balls > 0
                ? Number(((stats.runs / stats.balls) * 100).toFixed(2))
                : 0;
        }
    }

    return strikeRateOfBatsman;
}

module.exports = strikeRate;