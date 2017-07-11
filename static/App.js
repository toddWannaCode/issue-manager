'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var content = document.getElementById('contents');

var IssueList = function (_React$Component) {
    _inherits(IssueList, _React$Component);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this.state = { issues: [] };
        return _this;
    }

    _createClass(IssueList, [{
        key: 'fillDates',
        value: function fillDates(issue) {
            issue.created = new Date(issue.created);
            if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
            return issue;
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var _this2 = this;

            fetch('/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIssue)
            }).then(function (res) {
                return [res.ok, res.json()];
            }).then(function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
                    var newIssue, issue;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return data[1];

                                case 2:
                                    newIssue = _context.sent;

                                    if (data[0]) {
                                        console.log(newIssue);
                                        issue = _this2.fillDates(newIssue);

                                        _this2.setState({ issues: _this2.state.issues.concat(issue) });
                                    } else {
                                        console.log('err: ' + newIssue.message);
                                    }

                                case 4:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this2);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }()).catch(function (err) {
                return console.log(err.message);
            });
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this3 = this;

            fetch('/api/issues').then(function (res) {
                return res.json();
            }).then(function (data) {
                console.log("total count of records:", data._metadata.total_count, data);
                var issues = data.records.map(function (issue) {
                    return _this3.fillDates(issue);
                });
                _this3.setState({ issues: issues });
            }).catch(function (err) {
                return console.log(err);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Issue Tracker'
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: this.state.issues }),
                React.createElement('hr', null),
                React.createElement(IssueAdd, { createIssue: this.createIssue.bind(this) })
            );
        }
    }]);

    return IssueList;
}(React.Component);

var IssueTable = function IssueTable(_ref2) {
    var issues = _ref2.issues;

    var issueRows = issues.map(function (issue) {
        return React.createElement(IssueRow, { key: issue.id, issue: issue });
    });
    var borderedStyle = { border: "1px solid silver", padding: 6 };
    return React.createElement(
        'table',
        { style: { borderCollapse: "collapse" } },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Id'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Title'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Status'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Owner'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Created'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Effort'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Completion Date'
                ),
                React.createElement(
                    'th',
                    { style: borderedStyle },
                    'Description'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issueRows
        )
    );
};

var IssueFilter = function (_React$Component2) {
    _inherits(IssueFilter, _React$Component2);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                ' This is a place holder '
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

var IssueAdd = function (_React$Component3) {
    _inherits(IssueAdd, _React$Component3);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        var _this5 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this5.handleSubmit = _this5.handleSubmit.bind(_this5);
        return _this5;
    }

    _createClass(IssueAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.issueAdd;
            this.props.createIssue({
                owner: form.owner.value,
                title: form.title.value,
                status: 'New',
                created: new Date()
            });
            form.owner.value = "";
            form.title.value = "";
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { name: 'issueAdd', onSubmit: this.handleSubmit },
                    React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                    React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                    React.createElement(
                        'button',
                        null,
                        'Add'
                    )
                )
            );
        }
    }]);

    return IssueAdd;
}(React.Component);

var IssueRow = function IssueRow(_ref3) {
    var issue = _ref3.issue;

    var borderedStyle = { border: "1px solid silver", padding: 4 };
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.id
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.title
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.status
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.owner
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.created.toDateString()
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.effort
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.completionDate && issue.completionDate.toDateString()
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            issue.description
        )
    );
};

ReactDOM.render(React.createElement(IssueList, null), content);