const Router = require('koa-router')
const validateIssue = require('./utils/validateIssue')

const router = new Router({
    prefix: '/api'
});

const issues = [
  {
    id: 1, status: 'Open', 
    owner: 'Ravan',
    created: new Date('2016-08-15'), 
    effort: 5, 
    completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, 
    status: 'Assigned', 
    owner: 'Eddie',
    created: new Date('2016-08-16'), 
    effort: 14, 
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
];



router.get('api::issues::get', '/issues', async (ctx, next) => {
    ctx.body = {
        _metadata: {
            total_count: issues.length
        },
        records: issues
    }
})

router.post('api::issues::post', '/issues',
    validateIssue,
    async (ctx, next) => {
        const newIssue = ctx.request.body;
        console.log(newIssue)
        newIssue.id = issues.length + 1;
        newIssue.created = new Date();
        issues.push(newIssue)
        ctx.body = newIssue
    }
)

module.exports = router.routes()