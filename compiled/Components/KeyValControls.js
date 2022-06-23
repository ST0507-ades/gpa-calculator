var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export default function KeyValControls(props) {
    var _React$useState = React.useState(true),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        isExpired = _React$useState2[0],
        setIsExpired = _React$useState2[1];

    var _React$useState3 = React.useState(2300),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        lastId = _React$useState4[0],
        setLastId = _React$useState4[1];

    var data = props.data;


    React.useEffect(function () {
        props.onChange({
            isExpired: isExpired,
            lastId: lastId
        });
    }, [isExpired, lastId]);

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                {
                    onClick: function onClick() {
                        setLastId(data[data.length - 1].id);
                    }
                },
                "Next Page"
            )
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "label",
                null,
                "Is Expired?"
            ),
            React.createElement("input", {
                type: "checkbox",
                checked: isExpired,
                onChange: function onChange(e) {
                    setIsExpired(e.target.checked);
                }
            })
        )
    );
}