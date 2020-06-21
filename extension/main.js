const defaultSuggestion = `Search Javascript docs!`;
const c = new Compat();
const stdSearcher = new StdSearch(indexData);
const commandManager = new CommandManager(
    new CssCommand(cssIndex),
    new HtmlCommand(htmlIndex),
    new EventCommand(eventIndex)
);

const omnibox = new Omnibox(defaultSuggestion);

omnibox.bootstrap({
    onSearch: (query) => {
        return stdSearcher.search(query);
    },
    onFormat: (index, doc) => {
        return {
            content: `https://developer.mozilla.org${doc.href}`,
            description: `${c.match(doc.name)} - ${c.dim(c.escape(doc.title))}`,
        };
    },
    onAppend: () => {
        return [
            { content: "sss", description: "onAppend" }
        ]
    },
    // beforeNavigate: (content) => {
    //     return content
    // },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result)
    }
});

omnibox.addPrefixQueryEvent(":", {
    onSearch: (query) => {
        return commandManager.execute(query);
    },
});