import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import NumInput from './utils/NumInput.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


export default class IssueEdit extends Component {
    constructor(){
        super();
        this.state = {
            issue: {
                id: '',
                title: '',
                status: '',
                owner: '', 
                effort: '',
                completionDate: moment().format('DD/MM/YY'), 
                created: null,
                description: ''
            },
            invalidFields: {}
        };
        this.onChange = (event, convertedValue) => {
            const issue = Object.assign({}, this.state.issue);
            issue[event.target.name] = (convertedValue != undefined) ? convertedValue : event.target.value;
            this.setState({ issue });
        };
        this.onValidityChange = (event, valid) => {
            const invalidFields = Object.assign({}, this.state.invalidFields);
            if(!valid)
                invalidFields[event.target.name] = true
            else 
                delete invalidFields[event.target.name];
            this.setState({ invalidFields: invalidFields })
        }

        this.onSubmit = async (event) => {
            event.preventDefault();
            if(Object.keys(this.state.invalidFields).length)
                return;
            try {
                // this.state.issue.completionDate = this.state.issue.completionDate.format('DD/MM/YYYY') 
                console.log(this.state.issue)
                const res = await fetch(`/api/issues/${this.props.match.params.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: (console.log(JSON.stringify(this.state.issue)), JSON.stringify(this.state.issue)),
                })
                console.log(res)
                const issue = await res.json()
                if(res.ok) {
                    this.setState({issue})
                    alert('Issue Updated Succesfullly')
                } else {
                    alert('Issue update failed. err'+issue.message)
                }
            } catch (err) {
                console.log("Failed to send data: "+ err)
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadData();
        }
    }

    async loadData() {
        try {
            const res = await fetch(`/api/issues/${this.props.match.params.id}`)
            const issue = (await res.json()).records
            if(res.ok) {
                this.setState({ issue });
            } else {
                console.log(`Err: ${issue.message}`)
            }
        }
        catch(err) {
            console.log(`Error in fetching data from server: ${err.message}`)
        }
    }

    render() {
        const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null : (<div className="error">Please correct invalid fields before submitting.</div>);
        const issue = this.state.issue;
        return (
        <div>
            <form onSubmit={this.onSubmit}>
            ID: {issue.id}
            <br />
            Created: {`${issue.created || ''}` }
            <br />
            Status: <select name="status" value={issue.status} onChange={this.onChange}>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Verified">Verified</option>
                <option value="Closed">Closed</option>
            </select>
            <br />
            Owner: <input type={"text"} name={"owner"} value={issue.owner} onChange={this.onChange} />
            <br />
            Effort: <NumInput size={5} name={"effort"} value={issue.effort} onChange={this.onChange} />
            <br />
            Completion Date: <DatePicker 
                                name={"completionDate"} 
                                dateFormat="DD/MM/YYYY" 
                                selected={this.state.completionDate} 
                                onChange={(date) => {
                                    let issue = Object.assign({}, this.state.issue);
                                    issue.completionDate = date.format('DD/MM/YYYY')
                                    this.setState({ issue });
                                    }}/>
            <br />
            Title: <input name={"title"} size={50} value={issue.title} onChange={this.onChange} />
            <br />
            Description: <input name={"description"} size={250} value={issue.description} onChange={this.onChange} />
            <br />
            {validationMessage}
            <button type="submit">Submit</button>
            <Link to="/issues">Back to issue list</Link>
            </form>
        </div>
        );
    }
}