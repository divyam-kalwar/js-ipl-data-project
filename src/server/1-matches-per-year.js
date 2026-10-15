// Number of matches played per year for all the years in IPL.

function matchesPlayedPerYear(data){
    // Checks if input dataset is array
    if(!Array.isArray(data)){
        throw new TypeError("Input must be array");
    }

    const matchesByYear = {};

    for(const match of data){
        // Checks if match is object
        if (!match || typeof match !== "object") {
            throw new TypeError("Each match must be an object");
        }

        // Checks for valid season
        if(match.season === undefined || match.season === null || String(match.season).trim() === ""){
            throw new Error("Match is missing valid season");
        }

        const year = match.season;
        if(!matchesByYear[year]){
            matchesByYear[year] = 1;
        } else {
            matchesByYear[year]++;
        }
    }
    return matchesByYear;
}

module.exports = matchesPlayedPerYear;