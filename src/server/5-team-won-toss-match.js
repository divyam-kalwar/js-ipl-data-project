// Find the number of times each team won the toss and also won the match

function teamWonTossMatch(matches) {
    if (!Array.isArray(matches)) {
        throw new TypeError("Input must be array");
    }

    return matches.reduce((teams, match) => {
        if (!match || typeof match !== "object") {
            throw new TypeError("Each match must be an object");
        }

        // Initialize both teams with 0
        teams[match.team1] ??= 0;
        teams[match.team2] ??= 0;

        // Count when toss winner also won the match
        if (match.toss_winner === match.winner && match.winner) {
            teams[match.winner]++;
        }

        return teams;
    }, {});
}

module.exports = teamWonTossMatch;