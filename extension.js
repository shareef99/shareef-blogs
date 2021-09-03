const { default: axios } = require("axios");
const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
    console.log(
        'Congratulations, your extension "shareef-blogs" is now active!'
    );

    const res = await axios.get("https://dev.to/api/articles?username=shareef");

    const articles = res.data.map((article) => {
        return {
            label: article.title,
            detail: article.description,
            link: article.url,
        };
    });

    let disposable = vscode.commands.registerCommand(
        "shareef-blogs.searchShareefBlogs",

        async function () {
            const article = await vscode.window.showQuickPick(articles, {
                matchOnDetail: true,
            });

            if (article == null) return;

            vscode.env.openExternal(article.link);

            vscode.window.showInformationMessage(
                "Hello World from shareef-blogs!"
            );
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
