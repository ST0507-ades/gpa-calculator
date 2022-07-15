export default function Hello(props) {
    return React.createElement(
        "h1",
        null,
        "Hello ",
        props.name
    );
}