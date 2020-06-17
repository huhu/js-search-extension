const defaultSuggestion = `Search Javascript docs!`;
const c = new Compat();
const commandManager = new CommandManager(
    new CssCommand(cssIndex),
    new HtmlCommand(htmlIndex),
    new EventCommand(eventIndex)
);


const omibox = new Omnibox(defaultSuggestion)
let arr = [];
arr = functions.map((item) => {
    return ({
        description: `${item.name}`,
        content: `${item.href}`  //url
    })
})

function findQuery(query) {
    let ar = [];
    ar = arr.filter(({ content, description }) => {
        let descriptions = description.split(".");
        if (descriptions[descriptions.length - 1].includes(query)) {
            return {
                description,
                content
            };
        }
    })
    return ar;
}

omibox.bootstrap({
    onSearch: (query) => {
        return findQuery(query);
    },
    onFormat: (index, doc) => {
        return { content: doc.content, description: ` ${doc.description}` };
    },
    onAppend: () => {
        return [{
            content: "kkk",
            description: "No!!!"
        },
        ];
    },
    // beforeNavigate: (content) => {
    //     return content
    // },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result)
    }
});

omibox.addPrefixQueryEvent(":", {
    onSearch: (query) => {
        return commandManager.execute(query);
    },
});