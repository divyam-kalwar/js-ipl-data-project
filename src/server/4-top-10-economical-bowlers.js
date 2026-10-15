// Top 10 economical bowlers in the year 2015

function topEconomicalBowlers(matches,deliveries){
    const top10Bowlers = [];
    const bowlerStats = {}
    const matchId2015 = [];

    // Checks if match is object
    if(!Array.isArray(matches)){
        throw new TypeError("Input must be array");
    }

    if(!Array.isArray(deliveries)){
        throw new TypeError("Input must be array");
    }

    // Get match Id's of year 2015
    for(const match of matches){
        if(Number(match.season)===2015){
            matchId2015.push(Number(match.id));
        }
    }

    // Calculate the legal balls and total conceded runs per bowler
    for(const delivery of deliveries){
        if(!matchId2015.includes(Number(delivery.match_id))){
            continue;
        }
        const bowler = delivery.bowler;

        // Total runs bowler gave excluding byes, legbye, penalty
        const runsConceded =
            Number(delivery.total_runs || 0) -
            Number(delivery.bye_runs || 0) -
            Number(delivery.legbye_runs || 0) -
            Number(delivery.penalty_runs || 0);

        // Checks for illegal deliveries
        const isLegalBall = 
            Number(delivery.wide_runs || 0) === 0 && 
            Number(delivery.noball_runs || 0) === 0;

        if(!bowlerStats[bowler]){
            bowlerStats[bowler] = {
                runs: 0,
                legalBalls: 0
            };
        }
        bowlerStats[bowler].runs += runsConceded;

        if(isLegalBall){
            bowlerStats[bowler].legalBalls++;
        }
    }

    // Calcuate economy of each bowler
    for(const bowler in bowlerStats){
        const stats = bowlerStats[bowler];
        
        // Skip the bowler with no legal deliveries
        if(stats.legalBalls == 0){
            continue;
        }

        const overs = stats.legalBalls / 6;
        const economy = stats.runs / overs;

        top10Bowlers.push({
            bowler: bowler,
            economy: Number(economy.toFixed(2))
        });
    }

    top10Bowlers.sort((a, b) => a.economy - b.economy);

    return top10Bowlers.slice(0,10);
}

module.exports = topEconomicalBowlers;