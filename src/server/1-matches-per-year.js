// Number of matches played per year for all the years in IPL.

function matchesPlayedPerYear(matches){
    // Checks if input dataset is array
    if(!Array.isArray(matches)){
        throw new TypeError("Input must be array");
    }

    const matchesByYear = {};

    return matches.reduce((matchesByYear, match) => {

        // Checks if match is object
        if (!match || typeof match !== "object") {
            throw new TypeError("Each match must be an object");
        }

        // Checks for valid season
        if(match.season === undefined || match.season === null){
            throw new Error("Match is missing valid season");
        }

        matchesByYear[match.season] = (matchesByYear[match.season] || 0) + 1;
        return matchesByYear;
    },{});
}

module.exports = matchesPlayedPerYear;