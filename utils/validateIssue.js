module.exports = async function validateIssue(ctx, next) {
  const issue = ctx.request.body;
  const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
  };
  const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
  };
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      console.log(field);
      ctx.throw(422, `${field} is required.`);
    }
  }
  if (!validIssueStatus[issue.status]) { ctx.throw(422, `${issue.status} is not a valid status.`); }

  next();
};

