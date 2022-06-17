export default function KeyValRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.k}</td>
            <td>{props.value}</td>
            <td>{props.expire_on}</td>
            <td>
                <button>:)</button>
            </td>
        </tr>
    );
}
