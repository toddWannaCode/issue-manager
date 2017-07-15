import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
import React from 'react';
import 'whatwg-fetch';
import queryString from 'query-string';

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: []};
    }

    // fillDates(issue) {
    //     issue.created = new Date(issue.created)
    //     if (issue.completionDate)
    //         issue.completionDate = new Date(issue.completionDate);
    //     return issue
    // }

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
                    this.setState({ issues: this.state.issues.concat(issue)})
                }
                else {
                    console.log(`err: ${newIssue.message}`)
                }
            })
            .catch(err => console.log(err.message))
    }
    
    loadData() {
        fetch(`/api/issues${this.props.location.search}`)
            .then(res => res.json())
            .then(data => {
                const issues = data.records; 
                this.setState({ issues: issues })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate({location}) {
        const newQuery = this.props.location.search;
        const oldQuery = location.search;
        if (oldQuery === newQuery) {
            return;
        }
        this.loadData();
    }

    render() {
        return (
          <div>
            <h1>Issue Tracker</h1>
            <IssueFilter setSearchString={(search) => {
                this.props.history.push({pathname: this.props.location.pathname, search: queryString.stringify(search)});
                }} initFilter={queryString.parse(this.props.location.search)}/>
            <hr />
            <IssueTable issues={this.state.issues} />
            <hr />
            <IssueAdd createIssue={this.createIssue.bind(this)}/>
          </div>
        );
    }
}

IssueList.propTypes = {
  location: React.PropTypes.object.isRequired,
};