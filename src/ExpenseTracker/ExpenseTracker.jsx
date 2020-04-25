import React from "react";
import "./ExpenseTracker.css";
import Expense from "./Expense.js";

export default class ExpenseTracker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            name: "",
            cost: "",
            category: "",
        };

        // Enabled use of 'this' keyword for these functions
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleCostChange(event) {
        this.setState({ cost: event.target.value });
    }

    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
    }

    // Used in handleSubmit
    checkValidCost() {
        if (isNaN(parseFloat(this.state.cost))) {
            return false;
        } else return true;
    }

    handleSubmit(event) {
        // Prevents non-number costs from being added to the list
        if (!this.checkValidCost()) {
            this.setState({ cost: "" });
        } else {
            let newArray = this.state.array;
            let expense = new Expense(
                this.state.name,
                parseFloat(this.state.cost),
                this.state.category
            );
            newArray.push(expense);
            this.setState({ array: newArray });
        }
        // Prevents screen refresh when adding to the array
        event.preventDefault();
    }

    removeItem(item) {
        // Locates index of given Expense instance and removes
        let array = this.state.array;
        array.splice(array.indexOf(item), 1);
        this.setState({ array: array });
    }

    render() {
        let array = this.state.array;

        return (
            <div className="body">
                <div className="user-input">
                    New Expense
                    <form>
                        <label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                placeholder="Name"
                            />
                        </label>
                        <label>
                            <input
                                type="text"
                                value={this.state.cost}
                                onChange={this.handleCostChange}
                                placeholder="Cost"
                            />
                        </label>
                        <label>
                            <input
                                type="text"
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                                placeholder="Category"
                            />
                        </label>
                        <input
                            type="submit"
                            value="Submit"
                            onClick={this.handleSubmit}
                        />
                    </form>
                </div>
                <div className="expense-list-container">
                    <div className="expense-list">
                        <div className="expense">
                            <div className="item">
                                <strong>Name</strong>
                            </div>
                            <div className="mid-item">
                                <strong>Cost</strong>
                            </div>
                            <div className="item">
                                <strong>Category</strong>
                            </div>
                        </div>
                        {array.map((value) => (
                            <div className="expense">
                                <div className="item">{value.name}</div>
                                <div className="mid-item">${value.cost}</div>
                                <div className="item">{value.category}</div>
                                <div
                                    className="button"
                                    onClick={() => this.removeItem(value)}
                                >
                                    Remove
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
