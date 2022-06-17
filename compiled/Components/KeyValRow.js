export default function KeyValRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.id
        ),
        React.createElement(
            "td",
            null,
            props.k
        ),
        React.createElement(
            "td",
            null,
            props.value
        ),
        React.createElement(
            "td",
            null,
            new Date(props.expire_on * 1000).toLocaleString()
        ),
        React.createElement(
            "td",
            null,
            React.createElement(
                "button",
                null,
                ":)"
            )
        )
    );
}