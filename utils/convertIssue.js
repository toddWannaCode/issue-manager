module.exports = (issue) => {
    if(issue.created)
        issue.created = new Date(issue.created);
    if (issue.completionDate)
        issue.completionDate = new Date(issue.completionDate);
    return issue
}