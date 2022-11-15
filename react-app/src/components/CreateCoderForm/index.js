import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
// import {CreateSpot} from "../../store/spotsReducer"
// import {getAllSpots} from '../../store/spotsReducer'
import "./CreateCoderForm.css";

function CoderForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [bio, setBio] = useState('')
  const [experience, setExperience] = useState('')
  const [dailyRate, setDailyRate] = useState('')
  const [skills, setSkills] = useState([])

  const handleSelect = function(selectedSkills) {
    console.log("this is selected skills", selectedSkills)
    const chosenSkills = [];
    console.log("this is chosen Skills", chosenSkills)
    for (let i=0; i<selectedSkills.length; i++) {
      chosenSkills.push(selectedSkills[i].value);
    }
    setSkills(chosenSkills);
}

  const [validationErrors, setValidationErrors] = useState([])


//   useEffect(() => {
//     dispatch(getAllSpots())
// }, [dispatch])


const submitHandler = async (e) => {
  e.preventDefault()

    const errors = []

        // if (!bio.length) errors.push("Please provide a name")
        // if (!experience.length) errors.push("Please provide an address");
        // if (!daily.length) errors.push("Please provide a city");
        // if (!skills) errors.push("Please provide a description")
        // if (url.slice(0,5).toLowerCase() !== "https") errors.push("Url must start with https")



    setValidationErrors(errors)

  const payload = {
    bio,
    experience,
    dailyRate,
    skills
}


if(errors.length){
  return null
}

// let createdSpot;

// // console.log("this is created spot", createdSpot)
// createdSpot = await dispatch(CreateSpot(payload, imagePayload))

// history.push(`/spots/${createdSpot.id}`)
// // console.log("THIS IS OUR CREATED SPOT", createdSpot)
//   // history.push(`/api/spots/${createdSpot.id}`)
}
//return spot from teh THUNK



  return (
    <div className="Outer-Container">
      <div className="Inner-Container">
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      <div className="title-box">
      <h2 className="title-words">Coder Details</h2>
      </div>
      <div className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <div key={error}>{error}</div>
        )}
      </div>
      <div className="form-container">
      <label>
        Bio
        <input
        className="form-inputs"
        required
          type="text"
          name="bio"
          onChange={(e)=> setBio(e.target.value)}
          value={bio}
          placeholder="Tell us about yourself"
        />
      </label>
      <label>
        Experience
        <input
        className="form-inputs"
        required
          type="text"
          name="experience"
          onChange={(e)=> setExperience(e.target.value)}
          value={experience}
          placeholder="Tell us about all your coding experience!"
        />
      </label>
      <label>
        Daily Rate
        <input
        className="form-inputs"
        required
          type="number"
          name="daily rate"
          onChange={(e)=> setDailyRate(e.target.value)}
          value={dailyRate}
          placeholder="How much per day?"
        />
      </label>

      <label>
      Your Selected Coding Skills
        <input
        className="form-inputs"
        required
          type="text"
          name="skills"
          onChange={(e)=> setSkills(e.target.value)}
          value={skills}
          placeholder="Select Skills"
        />
      </label>
      <label>
        Coding Skill selections!
      <select multiple={true} value={skills} onChange={(e)=> {handleSelect(e.target.selectedOptions)}}>
                <option value="Python">Python</option>
                <option value="Javascript">Javascript</option>
                <option value="C++">C++</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
                <option value="React">React</option>
                <option value="Camel">Camel</option>
      </select>
      </label>
      </div>
      <div className="button-container">
      <button className="Create-Spot-button"
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          // disabled={!!validationErrors.length}
      >
        Become a coder!
      </button>
      </div>
    </form>
      </div>
    </div>
  );
}

export default CoderForm;
