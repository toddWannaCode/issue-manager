import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
import React from 'react';
import 'whatwg-fetch';

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: []};
    }

    fillDates(issue) {
        issue.created = new Date(issue.created)
        if (issue.completionDate)
            issue.completionDate = new Date(issue.completionDate);
        return issue
    }

    createIssue(newIssue) {
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue)
        })
            .then(res => [res.ok, res.json()])
            .then(async data => {
                const newIssue = await data[1]
                if(data[0]){
                    console.log(newIssue)
                    const issue = this.fillDates(newIssue)
                    this.setState({ issues: this.state.issues.concat(issue)})
                }
                else {
                    console.log(`err: ${newIssue.message}`)
                }
            })
            .catch(err => console.log(err.message))
    }
    
    loadData() {
        fetch('/api/issues')
            .then(res => res.json())
            .then(data => {
                console.log("total count of records:", data._metadata.total_count, data);
                const issues = data.records.map(issue => this.fillDates(issue))  
                this.setState({ issues: issues })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
          <div>
            <h1>Issue Tracker</h1>
            <IssueFilter />
            <hr />
            <IssueTable issues={this.state.issues} />
            <hr />
            <IssueAdd createIssue={this.createIssue.bind(this)}/>
          </div>
        );
    }
}
