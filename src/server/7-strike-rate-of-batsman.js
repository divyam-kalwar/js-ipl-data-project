// Find the strike rate of a batsman for each season

function strikeRate(matches, deliveries) {
    if (!Array.isArray(matches) || !Array.isArray(deliveries)) {
        throw new TypeError("Input must be array");
    }

    // Map each match ID to its season
    const matchSeason = matches.reduce((acc, match) => {
        acc[Number(match.id)] = Number(match.season);
        return acc;
    }, {});

    // Calculate runs and balls faced for each batsman per season
    const batsmanStats = deliveries.reduce((acc, delivery) => {
        const season = matchSeason[Number(delivery.match_id)];

        if (season === undefined) {
            return acc;
        }

        const batsman = delivery.batsman;
        const runs = Number(delivery.batsman_runs || 0);

        acc[season] ??= {};
        acc[season][batsman] ??= { runs: 0, balls: 0 };

        acc[season][batsman].runs += runs;

        if (Number(delivery.wide_runs || 0) === 0) {
            acc[season][batsman].balls++;
        }

        return acc;
    }, {});

    // Calculate strike rate for each batsman
    return Object.entries(batsmanStats).reduce((result, [season, batsmen]) => {
        result[season] = Object.entries(batsmen).reduce((seasonResult, [batsman, stats]) => {
            seasonResult[batsman] = stats.balls > 0
                ? Number(((stats.runs / stats.balls) * 100).toFixed(2))
                : 0;

            return seasonResult;
        }, {});

        return result;
    }, {});
}

module.exports = strikeRate;