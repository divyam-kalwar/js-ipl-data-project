// Find the highest number of times one player has been dismissed by another player

function playerDismissed(deliveries) {
    if (!Array.isArray(deliveries)) {
        throw new TypeError("Input must be an array");
    }

    const dismissalStats = deliveries.reduce((acc, delivery) => {
        if (!delivery.player_dismissed) {
            return acc;
        }

        const bowler = delivery.bowler;
        const dismissed = delivery.player_dismissed;

        acc[bowler] ??= {};
        acc[bowler][dismissed] ??= 0;
        acc[bowler][dismissed]++;

        return acc;
    }, {});

    const pairs = Object.entries(dismissalStats).reduce(
        (acc, [bowler, players]) => {
            Object.entries(players).forEach(([dismissed, count]) => {
                acc.push({ bowler, dismissed, count });
            });

            return acc;
        },[]
    );

    return pairs.reduce((highest, current) => {
        if (current.count > (highest.count ?? 0)) {
            return current;
        }
        return highest;
    }, {});
}

module.exports = playerDismissed;