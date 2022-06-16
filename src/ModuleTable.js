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

window.addEventListener('DOMContentLoaded', function () {
    const domContainer = document.querySelector('#table-root');
    const root = ReactDOM.createRoot(domContainer);
    root.render(<ModuleTable />);
});
