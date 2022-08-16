const Page = require("./Page")

class Master extends Page {
    async open() {
        await super.open("#/")
    }

    _viewName = "acc.todolist.view.Master"
}

module.exports = new Master()