// Extra runs conceded per team in the year 2016

function concededRunsPerTeam(matches, deliveries){    
    // Checks if match is object
    if(!Array.isArray(matches)){
        throw new TypeError("Input must be array");
    }

    if(!Array.isArray(deliveries)){
        throw new TypeError("Input must be array");
    }

    // Collecting the Id's of the matches played in 2016
    const matchIds2016 = matches.filter(match => {
        // Checks if match is object
        if (!match || typeof match !== "object") {
            throw new TypeError("Each match must be an object");
        }
        return Number(match.season) === 2016;
    })
    .map(match => Number(match.id));

    // Process the deliveries that belongs to season 2016
    const concededRuns = deliveries.reduce((acc, delivery) => {
        // Checks if match is object
        if (!delivery || typeof delivery !== "object") {
            throw new TypeError("Each match must be an object");
        }

        // Skips the deliveries from outside the season 2016
        if(!matchIds2016.includes(Number(delivery.match_id))){
            return acc;
        }

        // Calculate extras
        const extras =
            Number(delivery.wide_runs || 0) +
            Number(delivery.noball_runs || 0) +
            Number(delivery.bye_runs || 0) +
            Number(delivery.legbye_runs || 0) +
            Number(delivery.penalty_runs || 0);
        
        // Updates the bowling team's total
        const team = delivery.bowling_team;

        // Add the extras to the concededRuns
        if (!acc[team]) {
            acc[team] = extras;
        } else {
            acc[team] += extras;
        }
    
        return acc;
    }, {});
    return concededRuns;
}

module.exports = concededRunsPerTeam;