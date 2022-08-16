const Page = require("./Page")

class Detail extends Page {
    async open() {
        //Cambiar ruta
        await super.open("#/note/{ID}")
    }

    _viewName = "acc.todolist.view.Detail"
}

module.exports = new Detail()