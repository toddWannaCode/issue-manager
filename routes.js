const Router = require('koa-router')
const validateIssue = require('./utils/validateIssue')
const compare = require('./utils/compare')
const convertIssue = require('./utils/convertIssue')
const moment = require('moment');

const router = new Router({
    prefix: '/api'
});

const issues = [
  {
    id: 1, status: 'Open', 
    owner: 'Ravan',
    created: '14-07-2017 10:49:22', 
    effort: 5, 
    completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, 
    status: 'Assigned', 
    owner: 'Eddie',
    created: '15-07-2017 09:29:22', 
    effort: 14, 
    completionDate: '18-07-2017',
    title: 'Missing bottom border on panel',
    description: 'wooonktan clan'
  },

];



router.get('api::issues::get', '/issues', async (ctx, next) => {
    console.log('get')
    res = issues.filter(v => v.status === ctx.query.status &&  compare(v.effort, ctx.query.effort_gte, ctx.query.effort_lte))
    ctx.body = {
        _metadata: {
            total_count: ctx.querystring.length ? res.length : issues.length
        },
        records: ctx.querystring && res || issues
    }
})

router.get('api::issues::get_id', '/issues/:id', async (ctx, next) => {
    console.log('get_id')
    res = issues.find(v => v.id === ~~ctx.params.id)
    if(res)
        ctx.body = {
            _metadata: {
                total_count: 1
            },
            records: res
        }
    else
        ctx.throw(404, "Not found")
})


router.post('api::issues::post', '/issues',
    validateIssue,
    async (ctx, next) => {
        console.log('post')
        const newIssue = ctx.request.body;
        console.log(newIssue)
        newIssue.id = issues.length + 1;
        newIssue.created = moment().format('DD-YY-YYYY HH:mm:ss')
        issues.push(newIssue)
        ctx.body = newIssue
    }
)

router.put("api::issues::put", '/issues/:id', async(ctx, next) => {
    console.log("Put")
    let index;
    res = issues.map((v,i) => v.id === ~~ctx.params.id && (index = i))
    console.log(index)
    console.log(res)
    if(res.length) {
    req = ctx.request.body
    console.log(req)
    for(x in req) {
        if(res[x])
            issues[index][x] = req[x]
    }
    ctx.body = issues[index][x]
    console.log(issues[index])

    } else
        ctx.throw(404, "Not found from end")
})

module.exports = router.routes()