export default class Expense {
    #name = "";
    #cost = "";
    #category = "";
    constructor(name, cost, category) {
        this.#name = name;
        this.#cost = cost;
        this.#category = category;
    }

    get name() {
        return this.#name;
    }

    get cost() {
        return this.#cost;
    }

    get category() {
        return this.#category;
    }
}