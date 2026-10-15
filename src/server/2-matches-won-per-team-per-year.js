// Number of matches won per team per year in IPL.

function matchesWonPerYear(data){
    // Checks if input is array
    if(!Array.isArray(data)){
        throw new TypeError('Input type must be array');
    }

    const matchWonPerTeam = {};

    for(const match of data){
        // Check if match is object
        if(!match || typeof match !== 'object'){
            throw new TypeError('Match is not an object');
        }

        const winnerTeam = match.winner;

        // Skip matches with no winner
        if (winnerTeam === "") {
            continue;
        }

        // Check for valid winner
        if(winnerTeam === undefined || winnerTeam === null){
            throw new Error("Match is missing valid season");
        }

        if(!matchWonPerTeam[winnerTeam]){
            matchWonPerTeam[winnerTeam] = 1;
        } else {
            matchWonPerTeam[winnerTeam]++;
        }
    }
    return matchWonPerTeam;
}

module.exports = matchesWonPerYear;