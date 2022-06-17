export default function KeyValRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.k}</td>
            <td>{props.value}</td>
            <td>{new Date(props.expire_on * 1000).toLocaleString()}</td>
            <td>
                <button>:)</button>
            </td>
        </tr>
    );
}
