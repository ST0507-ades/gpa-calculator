import { expireKey } from '../api.js';

var useMutation = window.ReactQuery.useMutation;


export default function KeyValRow(props) {
    var now = Math.floor(new Date() / 1000);
    var isExpired = props.expire_on <= now;

    var _useMutation = useMutation(function () {
        return expireKey(props.k, now);
    }),
        error = _useMutation.error,
        isLoading = _useMutation.isLoading,
        mutateAsync = _useMutation.mutateAsync;

    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            props.id
        ),
        React.createElement(
            'td',
            null,
            props.k
        ),
        React.createElement(
            'td',
            null,
            props.value
        ),
        React.createElement(
            'td',
            null,
            new Date(props.expire_on * 1000).toLocaleString()
        ),
        React.createElement(
            'td',
            null,
            isLoading ? 'Loading...' : error ? error.message : React.createElement(
                'button',
                {
                    onClick: function onClick() {
                        mutateAsync().then(function () {
                            return props.onExpire();
                        });
                    },
                    disabled: isExpired
                },
                'Expire'
            )
        )
    );
}