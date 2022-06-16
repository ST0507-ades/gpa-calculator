function ModuleRow(props) {
    // TODO: Implement Delete
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.credit}</td>
            <td>{props.grade}</td>
            <td>
                <button>delete</button>
            </td>
        </tr>
    );
}

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
            <tbody>
                {props.rows.map((row) => (
                    <ModuleRow name={row.name} credit={row.credit} grade={row.grade} />
                ))}
            </tbody>
        </table>
    );
}

let addRow; // In global to be used by other scripts
let getRows;

window.addEventListener('DOMContentLoaded', function () {
    const rows = [];

    const domContainer = document.querySelector('#table-root');
    const root = ReactDOM.createRoot(domContainer);

    function renderModuleTable() {
        root.render(<ModuleTable rows={rows} />);
    }

    addRow = function (name, credit, grade) {
        rows.push({ name, credit, grade });
        renderModuleTable(); // Do it each time a new row is added
    };
    getRows = function () {
        return [...rows]; // We want to create a new copy of the row
    };

    renderModuleTable(); // Do it once on DOMContentLoaded
});
