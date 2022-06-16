function ModuleRow(props) {
    // TODO: Implement Delete
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            props.name
        ),
        React.createElement(
            'td',
            null,
            props.credit
        ),
        React.createElement(
            'td',
            null,
            props.grade
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'button',
                null,
                'delete'
            )
        )
    );
}

function ModuleTable(props) {
    return React.createElement(
        'table',
        { id: 'module-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Name'
                ),
                React.createElement(
                    'th',
                    null,
                    'Credit'
                ),
                React.createElement(
                    'th',
                    null,
                    'Grade'
                ),
                React.createElement(
                    'th',
                    null,
                    'Delete'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            props.rows.map(function (row) {
                return React.createElement(ModuleRow, { name: row.name, credit: row.credit, grade: row.grade });
            })
        )
    );
}

var addRow = void 0; // In global to be used by other scripts

window.addEventListener('DOMContentLoaded', function () {
    var rows = [];
    addRow = function addRow(name, credit, grade) {
        rows.push({ name: name, credit: credit, grade: grade });
    };

    var domContainer = document.querySelector('#table-root');
    var root = ReactDOM.createRoot(domContainer);
    root.render(React.createElement(ModuleTable, { rows: rows }));
});