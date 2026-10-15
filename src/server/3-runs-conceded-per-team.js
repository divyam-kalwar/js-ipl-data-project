// Extra runs conceded per team in the year 2016

function concededRunsPerTeam(matches, deliveries){
    const concededRuns = {};
    const matchIds2016 = [];

    // Checks if match is object
    if(!Array.isArray(matches)){
        throw new TypeError("Input must be array");
    }

    if(!Array.isArray(deliveries)){
        throw new TypeError("Input must be array");
    }

    // Collecting the Id's of the matches played in 2016
    for(const match of matches){

        // Checks if match is object
        if (!match || typeof match !== "object") {
            throw new TypeError("Each match must be an object");
        }

        if(Number(match.season) === 2016){
            matchIds2016.push(Number(match.id));
        }
    }

    // Process the deliveries that belongs to season 2016
    for (const delivery of deliveries) {

        // Checks if match is object
        if (!delivery || typeof delivery !== "object") {
            throw new TypeError("Each match must be an object");
        }

        // Skips the deliveries from outside the season 2016
        if(!matchIds2016.includes(Number(delivery.match_id))){
            continue;
        }

        // Calculate extras conceded from current deliveries
        const extras =
            Number(delivery.wide_runs || 0) +
            Number(delivery.noball_runs || 0) +
            Number(delivery.bye_runs || 0) +
            Number(delivery.legbye_runs || 0) +
            Number(delivery.penalty_runs || 0);
        
        // Fetch the bowling team 
        const team = delivery.bowling_team;

        // Add the extras to the concededRuns
        if (!concededRuns[team]) {
            concededRuns[team] = extras;
        } else {
            concededRuns[team] += extras;
        }
    }
    return concededRuns;
}

module.exports = concededRunsPerTeam;