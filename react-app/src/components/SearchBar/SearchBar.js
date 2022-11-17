import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { loadAllCoders } from '../../store/coders';
import "./SearchBar.css"

export default function Search() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(loadAllCoders())
        // dispatch(getprojects())
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user);
    const codersArray = useSelector(state => Object.values(state.coders))
    // console.log("this is codersArray", codersArray)

    const [search, setSearch] = useState('')

// let skills = ["Javascript", "Java", "Ruby", "C++", "Camel", "React", "Python"]
if (!codersArray){
    return null
}
    const getCoderSkills = (coder) => {
        let skillArray = []
        // console.log("this is codersArray skills", coder.skills)
            let coderSkills = coder.skills
            for (let skill of coderSkills){
                let skillName = skill.skill_name.toUpperCase()

                // console.log("this is skill_name", skillName)
                skillArray.push(skillName)
            }
                return skillArray
    }


    const getFilteredItems = (search, codersArray) => {
        return codersArray.filter(coder => getCoderSkills(coder).includes(search.toUpperCase()) === true)
    }

    const submitHandler = async () => {

        // history.push("/results")
    }

    const filteredCoders = getFilteredItems(search, codersArray)
    // console.log("this is filteredCoders", filteredCoders)
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
                <div>
        {search ==='' ? null: (<h2 className='search-header'>Here are coders that match your search results</h2>)}
            <div className='search-results-cards'>

                {filteredCoders.map(coder => {
                    return (
                    <div className="coder-shortbio-container">
                        <div>{coder.user.first_name} {coder.user.last_name}</div>
                        <div>Bio: {coder.bio}</div>
                        <div>Experience: {coder.experience}</div>
                        <button><NavLink to={`/coders/${coder.id}`}>View Profile</NavLink></button>

                    </div>
                    )
                })}

        </div>
        </div>
        </div>
        </div>
    )
}
