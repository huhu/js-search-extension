class HelpCommand extends Command {
    constructor () {
        super("help", "Show the help messages.")
    }
    
    onExecute() {
        const value = [
            `Prefix ${c.match(":")} to execute command (:html, :css, :event)`,
            "Input plain keyword to search Javascript and DOM docs on MDN",
        ];
        return value.map((description, index) => {
            return {content: `${index+1}`, description};
        });
    }
}