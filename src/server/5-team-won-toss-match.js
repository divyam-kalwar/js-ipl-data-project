// Find the number of times each team won the toss and also won the match

function teamWonTossMatch(matches){
    const teams = {}

    // Checks if input dataset is array
    if(!Array.isArray(matches)){
        throw new TypeError("Input must be array");
    }

    for(const match of matches){
        // Checks if match is object
        if (!match || typeof match !== "object") {
            throw new TypeError("Each match must be an object");
        }

        if (!teams[match.team1]) {
            teams[match.team1]=0;
        }

        if (!teams[match.team2]) {
            teams[match.team2]=0;
        }

        if (match.toss_winner === match.winner && match.winner) {
            teams[match.winner]++;
        }
    }
    return teams;
}

module.exports = teamWonTossMatch;