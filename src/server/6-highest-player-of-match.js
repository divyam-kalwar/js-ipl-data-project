
 // Find the players with the highest number of Player of the Match awards per season

function highestPlayerOfMatch(matches) {
    // Checks if matches is object
    if (!Array.isArray(matches)) {
        throw new TypeError("Input must be an array");
    }

    const playerOfMatch = {};

    for (const match of matches) {
        if (!match || typeof match !== "object" || Array.isArray(match)) {
            throw new TypeError("Each match must be an object");
        }

        const season = Number(match.season);
        const player = match.player_of_match;

        // Skip records without a valid season or award winner
        if (!Number.isFinite(season) || !player) {
            continue;
        }

        // Initialize the season and player's award count
        if (!playerOfMatch[season]) {
            playerOfMatch[season] = {};
        }

        if (!playerOfMatch[season][player]) {
            playerOfMatch[season][player] = 0;
        }

        playerOfMatch[season][player]++;
    }

    // Find the highest award count for each season
    for (const season in playerOfMatch) {
        let highestCount = 0;
        let topPlayers = [];

        for (const player in playerOfMatch[season]) {
            const count = playerOfMatch[season][player];

            if (count > highestCount) {
                highestCount = count;
                topPlayers = [player];
            } else if (count === highestCount) {
                // Include players tied for the highest count
                topPlayers.push(player);
            }
        }

        playerOfMatch[season] = {
            players: topPlayers,
            awards: highestCount
        };
    }

    return playerOfMatch;
}

module.exports = highestPlayerOfMatch;
