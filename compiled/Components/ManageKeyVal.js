import KeyValTable from './KeyValTable.js';

function ManageKeyVal(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Manage Key Value pairs'
        ),
        React.createElement(KeyValTable, {
            rows: [{ id: 1, key: 1, value: 1, expire_on: 1 }, { id: 2, key: 2, value: 2, expire_on: 2 }, { id: 3, key: 3, value: 3, expire_on: 3 }]
        })
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.querySelector('#root'));
    root.render(React.createElement(ManageKeyVal, null));
});