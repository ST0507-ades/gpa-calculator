export default function KeyValControls(props) {
    const [isExpired, setIsExpired] = React.useState(true);
    const [lastId, setLastId] = React.useState(0);

    const { data } = props;

    React.useEffect(() => {
        props.onChange({
            isExpired,
            lastId,
        });
    }, [isExpired, lastId]);

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        setLastId(data[data.length - 1].id);
                    }}
                >
                    Next Page
                </button>
            </div>
            <div>
                <label>Is Expired?</label>
                <input
                    type="checkbox"
                    checked={isExpired}
                    onChange={(e) => {
                        setIsExpired(e.target.checked);
                    }}
                ></input>
            </div>
        </div>
    );
}
