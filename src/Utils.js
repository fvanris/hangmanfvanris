
function getQueryParameters() {
    const params = {};

    if (!window.location.search)
        return params;

    const queries = window.location.search.substr(1).split('&');
    for (let idx = 0; idx < queries.length; ++idx)
    {
        const query = queries[idx];
        const nameValue = query.split('=', 2);
        if (nameValue.length === 1)
            params[nameValue[0]] = "";
        else
            params[nameValue[0]] = decodeURIComponent(nameValue[1].replace(/\+/g, " "));
    }
    return params;
}

const queryParams = getQueryParameters();
export const DEBUG = queryParams["debug"] && Number.parseInt(queryParams["debug"]);

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
