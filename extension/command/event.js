class EventCommand extends Command {
    constructor(index) {
        super("event", "Search DOM event docs.");
        this.event = index.map(([name, description, title]) => {
            return { name, description, title }
        })
    }

    onExecute(arg) {
        let results = this.event;
        if (arg) {
            results = [];
            for (let label of this.event) {
                let index = label.name.toLowerCase().indexOf(arg);
                if (index > -1) {
                    label["matchIndex"] = index;
                    results.push(label);
                }
            }

            results = results.sort((a, b) => {
                if (a.matchIndex === b.matchIndex) {
                    return a.name.length - b.name.length;
                }
                return a.matchIndex - b.matchIndex;
            });
        }

        return results.map((item) => {
            return {
                content: "https://developer.mozilla.org/" + item.description,
                description: `${c.match(item.name)} - ${c.dim(c.escape(item.title))}`
            }
        })
    }

    onBlankResult(arg) {
        return [{
            content: `https://developer.mozilla.org/en-US/search?q=${arg}`,
            description: `Search event docs ${c.match(arg)} on https://developer.mozilla.org/`
        }]
    }
}