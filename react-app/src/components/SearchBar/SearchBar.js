import { useEffect, useState} from 'react';


export default function Search() {
    const [search, setSearch] = useState('')

    return (
        <div>
                <input
                    type="text"
                    placeholder="Search Here!"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
        </div>
    )
}
