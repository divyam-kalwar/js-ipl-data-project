function highestPlayerOfMatch(matches) {
    if (!Array.isArray(matches)) {
        throw new TypeError("Input must be an array");
    }

    // Count awards per season and player
    const playerOfMatch = matches.reduce((acc, match) => {
        if (!match || typeof match !== "object" || Array.isArray(match)) {
            throw new TypeError("Each match must be an object");
        }

        const season = Number(match.season);
        const player = match.player_of_match;

        if (!Number.isFinite(season) || !player) {
            return acc;
        }

        acc[season] ??= {};
        acc[season][player] ??= 0;
        acc[season][player]++;

        return acc;
    }, {});

    // Find the highest award count per season
    return Object.entries(playerOfMatch).reduce((result, [season, players]) => {
        const highestCount = Math.max(...Object.values(players));

        const topPlayers = Object.entries(players)
            .filter(([player, count]) => count === highestCount)
            .map(([player]) => player);

        result[season] = {
            players: topPlayers,
            awards: highestCount
        };

        return result;
    }, {});
}

module.exports = highestPlayerOfMatch;