import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { createproject, getprojects } from "../../store/projects"
import "./CreateProjectForm.css";
import { loadAllCoders } from "../../store/coders";
// import SelectCoderForProject from "../SelectCoderForProject";

function ProjectForm() {
  const history = useHistory()
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [start_date, setStartDate] = useState('')
  const [end_date, setEndDate] = useState('')
  const [skills, setSkills] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])

  let createdProjectId;

  useEffect(() => {
    dispatch(loadAllCoders())
  }, [dispatch])

  const currentUser = useSelector(state => state.session.user)


  const handleSelect = (value) => {
    if (skills.includes(value)) {
      skills.pop()
      setSkills(skills)
    } else {
      setSkills(skills => skills.concat(value))
    }
  }

  // let test = 2
  // let allCoders = useSelector(state => Object.values(state.coders))

  let createdProject

  const submitHandler = async (e) => {
    e.preventDefault()

    const errors = [];

    // console.log("the start date is ", start_date)
    // console.log("end date is ", end_date)
    if (!name.length) errors.push("Please choose a name for your project");
    if (!description.length) errors.push("Please provide a description of your project");
    if (!skills.length) errors.push("Please select the skills required for your project");
    if (!start_date) errors.push("Please select a start date");
    if (!end_date) errors.push("Please select an end date");
    if (new Date(end_date).getTime() < new Date(start_date).getTime()) errors.push("Please select valid start and end dates");
    if (new Date(start_date).getTime() < new Date().getTime()) errors.push("Invalid start date. Coder must be given at least 24 hour notice prior to start date");
    if (new Date(end_date).getTime() < new Date().getTime()) errors.push("Please select an end date in the future");


    setValidationErrors(errors)

    if (!errors.length) {
      const payload = {
        name,
        description,
        skills,
        start_date,
        end_date
      }

      createdProject = await dispatch(createproject(payload, 0, 0))
      if (createdProject) {
        setFormSubmitted(true)
        createdProjectId = createdProject.id
        history.push(`/projects/new/${createdProjectId}`)
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
            <h2 className="title-words">Project Details</h2>
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
                onChange={(e) => {
                  setValidationErrors([])
                  setStartDate(e.target.value)
                }}
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
                onChange={(e) => {
                  setValidationErrors([])
                  setEndDate(e.target.value)
                }}
                value={end_date}
              />
            </label>
            <label>
              <strong>Select Your Coding Skills</strong>
              {/* <input
        className="form-inputs"
        required
          type="text"
          name="skills"
          onChange={(e)=> setSkills(e.target.value)}
          value={skills}
          placeholder="Select Skills"
        /> */}
            </label>

            <input type="checkbox" id="Python" name="Python" value="Python" onChange={(e) => {
              setValidationErrors([])
              handleSelect(e.target.value)
            }} />
            <label> Python</label>
            <input type="checkbox" id="Javascript" name="Javascript" value="Javascript" onChange={(e) => {
              setValidationErrors([])
              handleSelect(e.target.value)
            }} />
            <label> Javascript</label>
            <input type="checkbox" id="C++" name="C++" value="C++" onChange={(e) => {
              setValidationErrors([])
              handleSelect(e.target.value)
            }} />
            <label> C++</label>
            <input type="checkbox" id="Ruby" name="Ruby" value="Ruby" onChange={(e) => {
              setValidationErrors([])
              handleSelect(e.target.value)
            }} />
            <label> Ruby</label>
            <input type="checkbox" id="Java" name="Java" value="Java" onChange={(e) => {
              setValidationErrors([])
              handleSelect(e.target.value)
            }} />
            <label> Java</label>
            <input type="checkbox" id="React" name="React" value="React" onChange={(e) => {
              setValidationErrors([])
              handleSelect(e.target.value)
            }} />
            <label> React</label>
            <input type="checkbox" id="Camel" name="Camel" value="Camel" onChange={(e) => {
              setValidationErrors([])
              handleSelect(e.target.value)
            }} />
            <label> Camel</label>
          </div>
          <div className="button-container">
            <button className="Create-Spot-button"
              type="submit"
              // disable={setValidationErrors.length > 0 ? true : false}
              disabled={!!validationErrors.length}
            >
              Select your Coder!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
