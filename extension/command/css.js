class CssCommand extends Command {
    constructor(index) {
        super("css", "Search css docs.");
        this.css = index.map(([name, description]) => {
            return { name, description };
        })
    }

    onExecute(arg) {
        let results = this.css;
        if (arg) {
            results = [];
            for (let label of this.css) {
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
                description: c.match(c.escape(item.name)),
            }
        })
    }

    onBlankResult(arg) {
        return [{
            content: `https://developer.mozilla.org/en-US/search?q=${arg}`,
            description: `Search css docs ${c.match(arg)} on https://developer.mozilla.org/`
        }]
    }
}