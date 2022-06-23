export default function KeyValControls(props) {
    const [isExpired, setIsExpired] = React.useState(true);
    const [lastId, setLastId] = React.useState(0);

    const { data } = props;

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        setLastId(data[data.length - 1].id);
                        props.onChange({ isExpired, lastId });
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
                        props.onChange({ isExpired, lastId });
                    }}
                ></input>
            </div>
        </div>
    );
}
