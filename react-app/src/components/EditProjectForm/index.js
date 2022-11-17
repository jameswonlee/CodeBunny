import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import {
    updateproject, getprojects
} from '../../store/projects'
import { loadAllCoders } from '../../store/coders'

function EditProjectForm() {
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getprojects())
    }, [])


    let allProjects = useSelector(state => console.log('state', state))
    // let currProject = allProjects.filter(project => project.id === projectId)

    // useEffect(() => {
    // currProject.skills.map(({skill_name}) => {
    //     return skill_name
    // })
    // })

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [start_date, setStartDate] = useState("")
    const [end_date, setEndDate] = useState("")
    const [skills, setSkills] = useState([])
    // const [formSubmitted, setFormSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])


    useEffect(() => {
        setDescription(allProjects && allProjects.description)
    }, [allProjects])

    //      console.log("curr proj is", currProject)

    //         // useEffect(() => {
    //         //     dispatch(loadAllCoders())
    //         // }, [dispatch])

    //         // const currentUser = useSelector(state => state.session.user)
    //         // let allCoders = useSelector(state => Object.values(state.coders))

    //         // console.log("this is currentUser", currentUser)
    //         // console.log("the start date is ", start_date)
    //         // console.log("end date is ", end_date)
    //         console.log("this is skills", currProject.skills)


    // useEffect(() => {
    //     setName(currProject && currProject.name)
    //     setDescription(currProject && currProject.description)
    //     setStartDate(currProject && currProject.start_date)
    //     setEndDate(currProject && currProject.end_date)
    //     setSkills(currProject && currProject.skills.map(({skill_name}) => {
    //         return skill_name
    //     }))
    // }, [currProject])
    // // doesnt work

    let handleSelect = (value) => {
        if (skills.includes(value)) {
            setSkills(skills.filter((skill) => {
                return skill !== value
            }))
        } else {
            setSkills(skills => skills.concat(value))
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault()

        const errors = []

        if (!name) errors.push("Please provide a name for your project");
        if (!description) errors.push("Please provide a description for your project");
        if (!start_date) errors.push("Please provide a start date for your project");
        if (!end_date) errors.push("Please provide an end date for your project");
        if (!skills) errors.push("Please select the skills required for your project")
        setValidationErrors(errors)

        if (!validationErrors.length) {
            const editPayload = {
                name,
                description,
                skills,
                start_date,
                end_date,
                projectId
            }

            let createdProject = await dispatch(updateproject(editPayload))
            if (createdProject) {
                // setFormSubmitted(true)
                let createdProjectId = createdProject.id;
                history.push(`/projects/${createdProjectId}`)
            }
        }
    }



    return (

        <div className="Outer-Container">
            <div className="Inner-Container">
                <form
                    className="spot-form" onSubmit={submitHandler}
                >
                    <div className="title-box">
                        <h2 className="title-words">Edit Your Project Details</h2>
                    </div>
                    <div className="errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map((error) =>
                                <div key={error}>{error}</div>
                            )}
                    </div>
                    <div className="form-container">
                        <label>
                            Project Name
                            <input
                                className="form-inputs"
                                required
                                type="text"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Project Name"
                            />
                        </label>
                        <label>
                            Description
                            <input
                                className="form-inputs"
                                required
                                type="text"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Tell us about all your Project!"
                            />
                        </label>
                        <label>
                            Start Date
                            <input
                                className="form-inputs"
                                required
                                type="date"
                                name="start_date"
                                onChange={(e) => setStartDate(e.target.value)}
                                value={start_date}
                            />
                        </label>
                        <label>
                            End Date
                            <input
                                className="form-inputs"
                                required
                                type="date"
                                name="end_date"
                                onChange={(e) => setEndDate(e.target.value)}
                                value={end_date}
                            />
                        </label>
                        {/* <label>
                            Your Selected Coding Skills
                            <input
                                className="form-inputs"
                                required
                                type="text"
                                name="skills"
                                onChange={(e) => setSkills(e.target.value)}
                                value={skills}
                                placeholder="Select Skills"
                            />
                        </label> */}

                        <input type="checkbox" id="Python" name="Python" value="Python" onChange={(e) => handleSelect(e.target.value)} />
                        <label> Python</label>
                        <input type="checkbox" id="Javascript" name="Javascript" value="Javascript" onChange={(e) => handleSelect(e.target.value)} />
                        <label> Javascript</label>
                        <input type="checkbox" id="C++" name="C++" value="C++" onChange={(e) => handleSelect(e.target.value)} />
                        <label> C++</label>
                        <input type="checkbox" id="Ruby" name="Ruby" value="Ruby" onChange={(e) => handleSelect(e.target.value)} />
                        <label> Ruby</label>
                        <input type="checkbox" id="Java" name="Java" value="Java" onChange={(e) => handleSelect(e.target.value)} />
                        <label> Java</label>
                        <input type="checkbox" id="React" name="React" value="React" onChange={(e) => handleSelect(e.target.value)} />
                        <label> React</label>
                        <input type="checkbox" id="Camel" name="Camel" value="Camel" onChange={(e) => handleSelect(e.target.value)} />
                        <label> Camel</label>


                    </div>
                    <div className="button-container">
                        <button className="Create-Spot-button"
                            type="submit"
                        // disable={setValidationErrors.length > 0 ? true : false}
                        // disabled={!!validationErrors.length}
                        >
                            Submit Your Changes!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default EditProjectForm;
