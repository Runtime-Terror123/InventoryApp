import React, {useEffect, useMemo} from "react";
import apiURL from "../api";
import {debounce} from "lodash";
import {NavLink} from "react-router-dom";

export default function Search() {
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [error, setError] = React.useState(null);

    async function search() {
        const response = await fetch(`${apiURL}/items/search`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
            }),
        })
        const data = await response.json();
        if (response.ok) {
            setResults(data);
            setError(null);
        } else {
            setError(data)
        }
    }

    const debouncedFetch = useMemo(() => debounce(search, 600), [query]);

    useEffect(() => {
        if (query.length > 0) {
            debouncedFetch(query);
        }
    }, [query]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
        }}>
            {error && <div style={{
                backgroundColor: "red",
                color: "white",
                marginBottom: "1vh",
                padding: "4px",
            }}>
                {error.message}
            </div>}
            <form onSubmit={event => {
                event.preventDefault();
                debouncedFetch()
            }}>
                <input type={"text"} placeholder={"Search..."} value={query}
                       onChange={e => setQuery(e.target.value)}
                       style={{
                            borderRadius: '8px',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderTop: 'none',
                            fontSize: '4em',
                            padding: '10px',
                        }}/>
            </form>
            <div style={{
                alignSelf: "flex-start",
            }}>
                {results.length > 0 && <h1>Results</h1>}
                {results.map((result, index) => {
                    return <div key={index}>
                        <NavLink to={`/items/${result.id}`}>{result.name}</NavLink>
                    </div>
                })}
            </div>
        </div>
    );
}