class eventCommand extends Command {
    constructor() {
        super("event", "event search docs!");
        this.event = eventIndex.map(([name, description, title]) => {
            return {name, description, title}
        })
    }

    onExecute(arg) {
        let results = this.event;
        if(arg) {
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

        return results.map((item,index) => {
            return {
                content: "https://developer.mozilla.org/" + item.description + `?${index}`,
                description: `${c.match(item.name)} - ${c.dim(c.escape(item.title))}`
            }
        })
    }
}