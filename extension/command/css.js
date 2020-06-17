class CssCommand extends Command {
    constructor(index) {
        super("css", "search css docs.");
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
        }

        results = results.sort((a, b) => {
            if (a.matchIndex === b.matchIndex) {
                return a.name.length - b.name.length;
            }
            return a.matchIndex - b.matchIndex;
        });

        return results.map((item) => {
            return {
                content: "https://developer.mozilla.org/" + item.description,
                description: c.match(c.escape(item.name)),
            }
        })
    }
}