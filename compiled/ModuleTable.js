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

window.addEventListener('DOMContentLoaded', function () {
    var domContainer = document.querySelector('#table-root');
    var root = ReactDOM.createRoot(domContainer);
    root.render(React.createElement(ModuleTable, null));
});