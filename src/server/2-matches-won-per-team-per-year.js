// Number of matches won per team per year in IPL.

function matchesWonPerYear(matches){
    // Checks if input is array
    if(!Array.isArray(matches)){
        throw new TypeError('Input type must be array');
    }

    const matchWonPerTeam = {};

    return matches.reduce((matchWonPerTeam, match) => {
        // Check if match is object
        if(!match || typeof match !== 'object'){
            throw new TypeError('Match is not an object');
        }

        const winnerTeam = match.winner;

        // Skip matches with no winner
        if (winnerTeam === "") {
            return matchWonPerTeam;
        }

        // Check for valid winner
        if(winnerTeam === undefined || winnerTeam === null){
            throw new Error("Match is missing valid season");
        }

        matchWonPerTeam[winnerTeam] = (matchWonPerTeam[winnerTeam] || 0) + 1;

        return matchWonPerTeam; 
    }, {});
}

module.exports = matchesWonPerYear;