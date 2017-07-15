import React from 'react';
import { Link } from 'react-router-dom';

const IssueRow = ({issue, location, search, match}) => {
    const borderedStyle = {border: "1px solid silver", padding: 4};
    return (
        <tr>
            <td style={borderedStyle}>{issue.id}</td>
            <td style={borderedStyle}>{issue.title}</td>
            <td style={borderedStyle}><Link to={`/issues/${issue.id}`}>{issue.status}</Link></td>
            <td style={borderedStyle}>{issue.owner}</td>
            <td style={borderedStyle}>{issue.created}</td>
            <td style={borderedStyle}>{issue.effort}</td>
            <td style={borderedStyle}>{issue.completionDate && issue.completionDate}</td>
            <td style={borderedStyle}>{issue.description}</td>
        </tr>
    )
};

export default IssueRow;