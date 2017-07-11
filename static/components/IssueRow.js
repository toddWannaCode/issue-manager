"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var IssueRow = exports.IssueRow = function IssueRow(_ref) {
    var issue = _ref.issue;

    var borderedStyle = { border: "1px solid silver", padding: 4 };
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.id
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.title
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.status
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.owner
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.created.toDateString()
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.effort
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.completionDate && issue.completionDate.toDateString()
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            issue.description
        )
    );
};