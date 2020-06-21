function StdSearch(indexData) {
    this.indexData = indexData;
}

StdSearch.prototype.search = function (query) {
    let result = [];
    query = query.toLowerCase().replace(/[-_]/gi, "");
    for (let [rawName, href, title] of this.indexData) {
        let name = rawName.toLowerCase().replace(/[-_]/gi, "");
        let matchIndex = name.indexOf(query);
        if (matchIndex !== -1) {
            result.push({
                name: rawName,
                href,
                title,
                matchIndex,
            })
        }
    }

    return result.sort((a, b) => {
        if (a.matchIndex === b.matchIndex) {
            return a.name.length - b.name.length;
        }
        return a.matchIndex - b.matchIndex;
    });
}