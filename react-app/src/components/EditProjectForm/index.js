import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import { updateproject, getprojects } from '../../store/projects'
import { loadAllCoders } from '../../store/coders'



function EditProjectForm() {
    let { projectId } = useParams()
    projectId = parseInt(projectId, 10)
    const dispatch = useDispatch();
    const history = useHistory();

    let allProjects = useSelector(state => Object.values(state.projects));
    let currProject = allProjects.filter(project => project.id === projectId);
    let sessionUser = useSelector(state => state.session.user);

    const startDate = new Date(currProject[0]?.start_date)
    const endDate = new Date(currProject[0]?.end_date)

    const newStartDate = startDate.getFullYear().toString().padStart(4, '0') + '-' + (startDate.getMonth()+1).toString().padStart(2, '0') + '-' + startDate.getDate().toString().padStart(2, '0');
    const newEndDate = endDate.getFullYear().toString().padStart(4, '0') + '-' + (endDate.getMonth()+1).toString().padStart(2, '0') + '-' + endDate.getDate().toString().padStart(2, '0');

    const [isLoaded, setIsLoaded] = useState(false)
    const [skills, setSkills] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [start_date, setStartDate] = useState("")
    const [end_date, setEndDate] = useState("")
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        setName(currProject[0]?.name)
        setDescription(currProject[0]?.description)
        setStartDate(newStartDate)
        setEndDate(newEndDate)
        setSkills(currProject[0]?.skills.map(({ skill_name }) => {
            return skill_name
        }))
    }, [projectId, isLoaded])


    useEffect(() => {
        dispatch(getprojects())
            .then(() => setIsLoaded(true))
    }, [])

    if (!currProject) {
        return null
    }

    if (!sessionUser) {
        return null
    }
    let sessionUserId;
    if (sessionUser) {
        sessionUserId = sessionUser.id
    }

    const handleSelect = (value) => {
        if (skills?.includes(value)) {
            setSkills(skills?.filter((skill) => {
                return skill !== value
            }))
        }
        else {
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
        if (!skills.length) errors.push("Please select the skills required for your project");
        if (!start_date) errors.push("Please select a start date");
        if (!end_date) errors.push("Please select an end date");
        if (new Date(end_date).getTime() < new Date(start_date).getTime()) errors.push("Please select valid start and end dates");
        if (new Date(start_date).getTime() < new Date().getTime()) errors.push("Invalid start date. Coder must be given at least 24 hour notice prior to start date");
        if (new Date(end_date).getTime() < new Date().getTime()) errors.push("Please select an end date in the future");

        setValidationErrors(errors)

        if (!errors.length) {
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
                history.push(`/current/user/projects`)
            }
        }
    }

    if (sessionUserId !== currProject[0]?.user_id || currProject[0]?.completed === true) {
        return <h2><strong>You do not have access to this page</strong></h2>
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

                        <div className="check-box-box">
                            <input type="checkbox" id="Python" name="Python" value="Python" checked={skills?.includes("Python")} onChange={(e) => {
                                setValidationErrors([]);
                                handleSelect(e.target.value)
                            }} />
                            <label className="coding-name" htmlFor="Python"> Python</label>
                            <input type="checkbox" id="Javascript" name="Javascript" value="Javascript" checked={skills?.includes("Javascript")} onChange={(e) => {
                                setValidationErrors([]);
                                handleSelect(e.target.value)
                            }} />
                            <label className="coding-name" htmlFor="Javascript"> Javascript</label>
                            <input type="checkbox" id="C++" name="C++" value="C++" checked={skills?.includes("C++")} onChange={(e) => {
                                setValidationErrors([]);
                                handleSelect(e.target.value)
                            }} />
                            <label className="coding-name" htmlFor="C++"> C++</label>
                            <input type="checkbox" id="Ruby" name="Ruby" value="Ruby" checked={skills?.includes("Ruby")} onChange={(e) => {
                                setValidationErrors([]);
                                handleSelect(e.target.value)
                            }} />
                            <label className="coding-name" htmlFor="Ruby"> Ruby</label>
                            <input type="checkbox" id="Java" name="Java" value="Java" checked={skills?.includes("Java")} onChange={(e) => {
                                setValidationErrors([]);
                                handleSelect(e.target.value)
                            }} />
                            <label className="coding-name" htmlFor="Java"> Java</label>
                            <input type="checkbox" id="React" name="React" value="React" checked={skills?.includes("React")} onChange={(e) => {
                                setValidationErrors([]);
                                handleSelect(e.target.value)
                            }} />
                            <label className="coding-name" htmlFor="React"> React</label>
                            <input type="checkbox" id="Camel" name="Camel" value="Camel" checked={skills?.includes("Camel")} onChange={(e) => {
                                setValidationErrors([]);
                                handleSelect(e.target.value)
                            }} />
                            <label className="coding-name" htmlFor="Camel"> Camel</label>
                        </div>

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
