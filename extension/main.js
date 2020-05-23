const defaultSuggestion = `Search Javascript docs!`;
const c = new Compat();
const commandManager = new CommandManager(

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
    ar = arr.filter((item) => {
        let description = item.description.split(".");
        // for (let i=0; i<query.length; i++) {
            if (description[description.length-1].includes(query)) {
                return item;
            }
        // }

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
    beforeNavigate: (content) => {
        return content
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result)
    }
});

omibox.addPrefixQueryEvent(":", {
    onSearch: (query) => {
        return  commandManager.execute(query);
    },
});