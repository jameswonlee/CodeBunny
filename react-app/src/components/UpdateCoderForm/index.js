import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {editCoder, loadOneCoder, loadAllCoders} from '../../store/coders'
// INTERESTEDING THAT LOADONECODER DOESNT Worker, BUT I CAN WORK WITH LOAD ALL CODESR
import "./UpdateCoderForm.css"


function UpdateCoderForm() {
  const { coderId } = useParams()
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)
  const coderInfo = useSelector(state => state.coders[coderId])

  const [bio, setBio] = useState('')
  const [experience, setExperience] = useState('')
  const [daily_rate, setDailyRate] = useState('')
  const [skills, setSkills] = useState([])
  const [validationErrors, setValidationErrors] = useState([])


  useEffect(() => {
    dispatch(loadAllCoders(coderId))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    setBio(coderInfo && coderInfo.bio)
    setExperience(coderInfo && coderInfo.experience)
    setDailyRate(coderInfo && coderInfo.daily_rate)
    setSkills(coderInfo && coderInfo.skills.map(({ skill_name }) => {
      return skill_name
    }))
  }, [coderInfo])





  if(!coderInfo) return null

  const handleSelect = (value) => {
    if(skills.includes(value)){
      setSkills(skills.filter((skill) => {
        return skill !== value
      }))
    } else {
      setSkills(skills => skills.concat(value))
    }
}

console.log('skills', skills)


const submitHandler = (e) => {
  e.preventDefault()

    const errors = []

        // if (!bio.length) errors.push("Please provide a name")
        // if (!experience.length) errors.push("Please provide an address");
        // if (!daily.length) errors.push("Please provide a city");
        // if (!skills) errors.push("Please provide a description")
        // if (url.slice(0,5).toLowerCase() !== "https") errors.push("Url must start with https")



    // setValidationErrors(errors)

  const payload = {
    id: coderId,
    bio,
    experience,
    daily_rate,
    skills
}


// if(errors.length){
//   return null
// }

let createdCoder;

// console.log("this is created coder", createdCoder)
createdCoder = dispatch(editCoder(payload))

history.push(`/coders/${coderId}`)
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
          value={daily_rate}
          placeholder="How much per day?"
        />
      </label>
      {/* <label>
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
      </label> */}
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
<label>Your Skills BELOW</label>
  <input type="checkbox" id="Python" name="Python" value="Python" checked={skills?.includes("Python")} onChange={(e)=> handleSelect(e.target.value)}/>
  <label htmlFor="Python"> Python</label>
  <input type="checkbox" id="Javascript" name="Javascript" value="Javascript" checked={skills?.includes("Javascript")}onChange={(e)=> handleSelect(e.target.value)}/>
  <label htmlFor="Javascript"> Javascript</label>
  <input type="checkbox" id="C++" name="C++" value="C++" checked={skills?.includes("C++")} onChange={(e)=> handleSelect(e.target.value)}/>
  <label htmlFor="C++"> C++</label>
  <input type="checkbox" id="Ruby" name="Ruby" value="Ruby" checked={skills?.includes("Ruby")} onChange={(e)=> handleSelect(e.target.value)}/>
  <label htmlFor="Ruby"> Ruby</label>
  <input type="checkbox" id="Java" name="Java" value="Java" checked={skills?.includes("Java")} onChange={(e)=>  handleSelect(e.target.value)}/>
  <label htmlFor="Java"> Java</label>
  <input type="checkbox" id="React" name="React" value="React" checked={skills?.includes("React")} onChange={(e)=> handleSelect(e.target.value)}/>
  <label htmlFor="React"> React</label>
  <input type="checkbox" id="Camel" name="Camel" value="Camel" checked={skills?.includes("Camel")} onChange={(e)=> handleSelect(e.target.value)}/>
  <label htmlFor="Camel"> Camel</label>


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

export default UpdateCoderForm;
