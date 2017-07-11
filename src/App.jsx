// @flow
const content = document.getElementById('contents')

class IssueList extends React.Component {
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

const IssueTable =({issues}) => {
    const issueRows = issues.map(
                        issue => <IssueRow key={issue.id} issue={issue}>
                                </IssueRow>
                    );
    const borderedStyle = {border: "1px solid silver", padding: 6}
    return (
        <table style={{borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th style={borderedStyle}>
                        Id
                    </th>
                    <th style={borderedStyle}>
                        Title
                    </th>
                    <th style={borderedStyle}>
                        Status
                    </th>
                    <th style={borderedStyle}>
                        Owner
                    </th>
                    <th style={borderedStyle}>
                        Created
                    </th>
                    <th style={borderedStyle}>
                        Effort
                    </th>
                    <th style={borderedStyle}>
                        Completion Date
                    </th>
                    <th style={borderedStyle}>
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    issueRows
                }
            </tbody>
        </table>
    )
}

class IssueFilter extends React.Component {
    render() {
        return <div> This is a place holder </div>
    }
}

class IssueAdd extends React.Component {

    props: {
        createIssue: Function
    }

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
        owner: form.owner.value,
        title: form.title.value,
        status: 'New',
        created: new Date(),
        });
        form.owner.value = ""; 
        form.title.value = "";
        e.preventDefault();
    }

    render() {
        return (
        <div>
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner"/>
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        </div>
        )
    }
}

const IssueRow = ({issue}) => {
    const borderedStyle = {border: "1px solid silver", padding: 4};
    return (
        <tr>
            <td style={borderedStyle}>{issue.id}</td>
            <td style={borderedStyle}>{issue.title}</td>
            <td style={borderedStyle}>{issue.status}</td>
            <td style={borderedStyle}>{issue.owner}</td>
            <td style={borderedStyle}>{issue.created.toDateString()}</td>
            <td style={borderedStyle}>{issue.effort}</td>
            <td style={borderedStyle}>{issue.completionDate && issue.completionDate.toDateString()}</td>
            <td style={borderedStyle}>{issue.description}</td>
        </tr>
    )
};
    
ReactDOM.render(<IssueList />, content)