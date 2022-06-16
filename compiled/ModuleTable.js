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
        React.createElement('tbody', null)
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