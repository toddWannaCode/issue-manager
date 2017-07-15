import React from 'react';

export default class IssueFilter extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
      status: props.initFilter.status || '',
      effort_gte: props.initFilter.effort_gte || '',
      effort_lte: props.initFilter.effort_lte || '',
      changed: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || '',
      effort_gte: newProps.initFilter.effort_gte || '',
      effort_lte: newProps.initFilter.effort_lte || '',
      changed: false,
    });
  }
  resetFilter() {
    this.setState({
      status: this.props.initFilter.status || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      changed: false,
    });
  }
  applyFilter() {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    this.props.setSearchString(newFilter);
  }

  render() {
    const Separator = () => <span> | </span>;
    return (
      <div>
        Status:
        <select name="status" value={this.state.status} onChange={(e) =>{
          this.setState({status: e.target.value, changed: true})
          }}>
            <option value="">(Any)</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
          &nbsp;Effort between:
        <input size={5} value={this.state.effort_gte} onChange={(e) => {
          this.setState(+e.target.value && {effort_gte: e.target.value, changed: true} || {})
        }}/>
      &nbsp;-&nbsp;
        <input size={5} value={this.state.effort_lte} onChange={(e) => {
          this.setState(+e.target.value && {effort_lte: e.target.value, changed: true} || {})
        }} />  
        <button onClick={this.applyFilter.bind(this)}>Apply</button>
        <button onClick={this.resetFilter.bind(this)} disabled={!this.state.changed}>Reset</button>
        <button onClick={() => this.props.setSearchString('')}>Clear</button>
      </div>
    );
  }
}