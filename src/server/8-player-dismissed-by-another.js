// Find the highest number of times one player has been dismissed by another player

function playerDismissed(deliveries) {
    const dismissalStats = {};

    for(const delivery of deliveries){
        if(delivery.player_dismissed){
            const bowler = delivery.bowler;
            const dismissed = delivery.player_dismissed;

            if(!dismissalStats[bowler]){
                dismissalStats[bowler] = {}; 
            }
            if(!dismissalStats[bowler][dismissed]){
                dismissalStats[bowler][dismissed] = 0;
            }
            dismissalStats[bowler][dismissed]++;
        }
    }
    let maxCount = 0;
    let dismissedPlayers = {};
    for(const bowler in dismissalStats){
        for(const dismissed in dismissalStats[bowler]){
            const count = dismissalStats[bowler][dismissed];
            if(count>maxCount){
                maxCount = count;
                
                dismissedPlayers = {
                    bowler: bowler,
                    dismissed: dismissed,
                    count: count
                }
            }
        }
    }
    return dismissedPlayers;
}

module.exports = playerDismissed;