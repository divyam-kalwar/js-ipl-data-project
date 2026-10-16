// Top 10 economical bowlers in the year 2015

function topEconomicalBowlers(matches,deliveries){
    // Checks if match is object
    if(!Array.isArray(matches)){
        throw new TypeError("Input must be array");
    }

    if(!Array.isArray(deliveries)){
        throw new TypeError("Input must be array");
    }

    // Get match Id's of year 2015
    const matchId2015 = matches.filter(match => {
        if(!match || typeof match !== 'object'){
            throw new TypeError("Each match must be an object");
        }
        return Number(match.season) === 2015;
    })
    .map(match => Number(match.id));

    // Calculate the legal balls and total conceded runs per bowler
    const bowlerStats = deliveries.reduce((acc, delivery) => {
        if(!delivery || typeof delivery !== 'object'){
            throw new TypeError("Each match must be an object");
        }

        if(!matchId2015.includes(Number(delivery.match_id))){
            return acc;
        }
        
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

        const bowler = delivery.bowler;

        if(!acc[bowler]){
            acc[bowler] = {
                runs: 0,
                legalBalls: 0
            };
        }
        acc[bowler].runs += runsConceded;

        if(isLegalBall){
            acc[bowler].legalBalls++;
        }

        return acc;
    },{});

    // Calcuate economy of each bowler
    const top10Bowlers = Object.keys(bowlerStats).reduce((acc, bowler)=>{
        const stats = bowlerStats[bowler];

        // Skip the bowler with no legal deliveries
        if(stats.legalBalls == 0){
            return acc;
        }

        const overs = stats.legalBalls / 6;
        const economy = stats.runs / overs;

        acc.push({
            bowler,
            economy: Number(economy.toFixed(2))
        });
    
        return acc;
    },[]);

    top10Bowlers.sort((a, b) => a.economy - b.economy);

    return top10Bowlers.slice(0,10);
}

module.exports = topEconomicalBowlers;