function DomSearch(domIndex) {
    this.domIndex = domIndex;
}

DomSearch.prototype.search = function (query) {
    let result = [];
    query = query.toLowerCase().replace(/[-_]/i, "");
    for (let [rawName, href, title] of this.domIndex) {
        let name = rawName.toLowerCase().replace(/[-_]/i, "");
        let matchIndex = name.indexOf(query);
        if (matchIndex != -1) {
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