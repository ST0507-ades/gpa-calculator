import { getAll } from '../api.js';
import KeyValControls from './KeyValControls.js';
import KeyValTable from './KeyValTable.js';

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function ManageKeyVal(props) {
    const [filter, setFilter] = React.useState({});
    const { data, error, isLoading, isRefetching, refetch } = useQuery(
        ['getAll', filter.lastId, filter.isExpired],
        () => getAll(filter.lastId, 20, filter.isExpired),
    );

    const onExpireRow = React.useCallback(() => {
        refetch();
    }, [refetch]);

    return (
        <div>
            <h1>Manage Key Value pairs</h1>
            <KeyValControls onChange={setFilter} data={data} />
            {isLoading || isRefetching ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error.message}</p>
            ) : (
                <KeyValTable rows={data} onExpireRow={onExpireRow}></KeyValTable>
            )}
        </div>
    );
}

function ManageKeyValApp(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ManageKeyVal />
        </QueryClientProvider>
    );
}

window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(document.querySelector('#root'));
    root.render(<ManageKeyValApp />);
});
