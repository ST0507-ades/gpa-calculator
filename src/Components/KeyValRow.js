import { expireKey } from '../api.js';

const { useMutation } = window.ReactQuery;

export default function KeyValRow(props) {
    const now = Math.floor(new Date() / 1000);
    const isExpired = props.expire_on <= now;

    const { error, isLoading, mutateAsync } = useMutation(() => expireKey(props.k, now));

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.k}</td>
            <td>{props.value}</td>
            <td>{new Date(props.expire_on * 1000).toLocaleString()}</td>
            <td>
                {isLoading ? (
                    'Loading...'
                ) : error ? (
                    error.message
                ) : (
                    <button
                        onClick={() => {
                            mutateAsync().then(() => props.onExpire());
                        }}
                        disabled={isExpired}
                    >
                        Expire
                    </button>
                )}
            </td>
        </tr>
    );
}
