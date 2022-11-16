import { useEffect, useState} from 'react';
import "./SearchBar.css"

export default function Search() {
    const [search, setSearch] = useState('')

    const submitHandler = async () => {

        // const payload = {
        //     id: spotid
        // }
        // let createdSpot;
        // createdSpot = dispatch(DeleteSpot(payload))
    }

    return (
        <div className="search-bar-container">
        <div className="search-bar">
                <input className="search-input"
                    type="search"
                    placeholder="Start your search!"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="icon-container">
                <i className="icon fa fa-search fa-2x" onClick= {() => submitHandler()}></i>
                </div>
        </div>
        </div>
    )
}
