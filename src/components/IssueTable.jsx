import IssueRow from './IssueRow.jsx';

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

export default IssueTable;