const c = new Compat();
const stdSearcher = new StdSearch(indexData);
const commandManager = new CommandManager(
    new HelpCommand(),
    new CssCommand(cssData),
    new HtmlCommand(htmlData),
    new EventCommand(eventData),
    new HistoryCommand(),
);

const MDN_URL = "https://developer.mozilla.org";
const defaultSuggestion = `Search Javascript, DOM API, and CSS etc docs in your address bar instantly!`;
const omnibox = new Omnibox(defaultSuggestion, c.omniboxPageSize());

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
    afterNavigated: (query, result) => {
        // Ignore the command history
        if (query && query.startsWith(":")) return;

        HistoryCommand.record(query, result)
    }
});

omnibox.addPrefixQueryEvent(":", {
    onSearch: (query) => {
        return commandManager.execute(query);
    },
});

let fileNewIssue = "title=Have you found a bug? Did you feel something was missing?&body=Whatever it was, we'd love to hear from you.";
chrome.runtime.setUninstallURL(
    `https://github.com/huhu/js-search-extension/issues/new?${encodeURI(fileNewIssue)}`
);