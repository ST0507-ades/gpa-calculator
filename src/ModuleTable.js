function ModuleTable(props) {
    return (
        <table id="module-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Credit</th>
                    <th>Grade</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    );
}

let addRow; // In global to be used by other scripts

window.addEventListener('DOMContentLoaded', function () {
    const rows = [];
    addRow = function (name, credit, grade) {
        rows.push({ name, credit, grade });
    };

    const domContainer = document.querySelector('#table-root');
    const root = ReactDOM.createRoot(domContainer);
    root.render(<ModuleTable rows={rows} />);
});
