import KeyValRow from './KeyValRow.js';

export default function KeyValTable(props) {
    return (
        <table border={1}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>key</th>
                    <th>value</th>
                    <th>expire on</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {props.rows.map(({ id, key, data, expire_on }) => (
                    <KeyValRow onExpire={props.onExpireRow} id={id} k={key} value={data} expire_on={expire_on} />
                ))}
            </tbody>
        </table>
    );
}
