// mock functions: https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock
// mock event listeners: 
import {Content21, 
        Content22,
        Content23, 
        SearchedProjResult, 
        SearchedTaskResult } from "./components/AppChanges";
import React from "react";
import { render } from "@testing-library/react";
import { screen, within } from '@testing-library/dom';

describe(Content23, () => {
    // checks if categorization of tasks is present: To Do, In Progress, Completed 
    it("should have 'To Do' message", function () {
        let { getByText } = render(<Content23 />);
        expect(getByText("To Do")).toMatchSnapshot(`
          <h1 class="content231Titles">
            To Do
          </h1>
        `);
    });
    it("should have 'In Progress' message", function () {
        let { getByText } = render(<Content23 />);
        expect(getByText("In Progress")).toMatchSnapshot(`
          <h1 class="content231Titles">
            In Progress
          </h1>
        `);
    });
    it("should have 'Completed' message", function () {
        let { getByText } = render(<Content23 />);
        expect(getByText("Completed")).toMatchSnapshot(`
          <h1 class="content231Titles">
            Completed
          </h1>
        `);
    });
    // checks for the right amount of rows in the searched task table and 
    // searched project table
    it("check 'searched Proj Div' shows right amount of rows", function () {
        const { getAllByTestId } = render(<Content23 />);
        const searchedProjRows = getAllByTestId("tbProjRow");
        expect(searchedProjRows.length).toBe(4);
    });

    it("check 'searched Task Div' shows right amount of rows", function () {
        const { getAllByTestId } = render(<Content23 />);
        const searchedTaskRows = getAllByTestId("tbTaskRow");
        expect(searchedTaskRows.length).toBe(5);
    });
});

// checks for correct display of button in component "Content21"
describe(Content21, () => {
    it("check for amount  of 'task creation' buttons", function () {
        const { getAllByTestId } = render(<Content21 />);
        const taskCreationBtns = getAllByTestId("taskCreateBtn");
        expect(taskCreationBtns.length).toBe(1);
    });

    it("check for amount  of 'task creation' buttons", function () {
        const { getAllByTestId } = render(<Content21 />);
        const projCreationBtns = getAllByTestId("projCreateBtn");
        expect(projCreationBtns.length).toBe(1);
    });

    it("check correct text is displayed in 'task create btn'", function () {
        const { getByTestId } = render(<Content21 />);
        const taskCreationBtns = getByTestId("taskCreateBtn");
        expect(taskCreationBtns.textContent).toBe("Create Task");
    });

    it("check correct text is displayed in 'proj create btn'", function () {
        const { getByTestId } = render(<Content21 />);
        const projCreationBtns = getByTestId("projCreateBtn");
        expect(projCreationBtns.textContent).toBe("Create Project");
    });
});

// checks for correct display of button in component "Content22"
