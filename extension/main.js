const defaultSuggestion = `Search Javascript, DOM API, and CSS etc docs in your address bar instantly!`;
const MDN_URL = "https://developer.mozilla.org";
const c = new Compat();
const stdSearcher = new StdSearch(indexData);
const commandManager = new CommandManager(
    new CssCommand(cssData),
    new HtmlCommand(htmlData),
    new EventCommand(eventData),
    new HistoryCommand(),
);

const omnibox = new Omnibox(defaultSuggestion);

omnibox.bootstrap({
    onSearch: (query) => {
        return stdSearcher.search(query);
    },
    onFormat: (index, doc) => {
        return {
            content: `${MDN_URL}${doc.href}`,
            description: `${c.match(doc.name)} - ${c.dim(c.escape(doc.title))}`,
        };
    },
    onAppend: (query) => {
        return [
            {
                content: `${MDN_URL}/en-US/search?q=${query}`,
                description: `Search javascript docs ${c.match(query)} on ${MDN_URL}`,
            }
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