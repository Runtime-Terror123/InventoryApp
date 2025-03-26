import React, {useEffect, useMemo} from "react";
import apiURL from "../api";
import {debounce} from "lodash";
import {NavLink} from "react-router-dom";

export default function Search() {
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [error, setError] = React.useState(null);

    async function search() {
        console.log(query);
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

    const debouncedFetch = useMemo(() => debounce(search, 1000), [query]);

    useEffect(() => {
        debouncedFetch(query);
    }, [query]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {error && <div style={{
                backgroundColor: "red",
                color: "white",
                marginBottom: "1vh",
                padding: "4px",
            }}>{error.message}</div>}
            <div>
                <input type={"text"} placeholder={"Search..."} value={query}
                       onChange={e => setQuery(e.target.value)}
                       style={{
                            borderRadius: '4px',
                            fontSize: '4em',
                        }}/>
            </div>
            <div>
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