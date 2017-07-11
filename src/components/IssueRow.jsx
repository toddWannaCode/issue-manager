import React from 'react';

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

export default IssueRow;