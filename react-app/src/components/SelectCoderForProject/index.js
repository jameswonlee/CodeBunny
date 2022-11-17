import { useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux"
import {createproject, getprojects} from "../../store/projects"
import { loadAllCoders } from "../../store/coders";
import { useParams } from 'react-router-dom';
import "./SelectCoderForProject.css"

function SelectCoderForProject() {
    const history = useHistory()
    const dispatch = useDispatch();
    const {projectId} = useParams();

    useEffect(() => {
        dispatch(loadAllCoders())
      },[dispatch])


      useEffect(() => {
        dispatch(getprojects())
      },[dispatch])

    let allProjects = useSelector(state => Object.values(state.projects))
    let allCoders = useSelector(state => Object.values(state.coders))

    if(!allCoders) return null
    if(!allProjects) return null


    // console.log("All projects is", allProjects)
    let currProject = allProjects.filter(project => project.id === +projectId)[0]
    if(!currProject) return null
    // console.log("Current project is", currProject)
    let neededSkills = []
    let currProjectSkills = currProject.skills.map(skill => neededSkills.push(skill.skill_name))
    // console.log("current project skills" , currProjectSkills)
    console.log("neededSkilss is", neededSkills)
    let neededSkillslength = neededSkills.length
    let coderSkills = []
    let skillsofCoders = allCoders.map(coder => coderSkills.push(coder.skills))
    // console.log("what is skills of Coders", skillsofCoders)
    // console.log("skills of Coders", coderSkills)
    let coderSkillss = []
    for (let i = 0; i < coderSkills.length; i++){
        let arr = []
        for(let j=0; j<coderSkills[i].length; j++){

            arr.push(coderSkills[i][j].skill_name)
    }
    coderSkillss.push(arr)
    }

  let eligiblecoderskills = []

    for(let i = 0; i < coderSkillss.length; i++){
        const containsAll = neededSkills.every(element => {
            return coderSkillss[i].sort().includes(element);
          });

          if(containsAll) eligiblecoderskills.push(coderSkillss[i])
    }

    console.log("eligibile coder skills without coder id attached ", eligiblecoderskills)

    //works up to there
    let allcodersskillsobj = {}

    for (let i = 0; i<allCoders.length; i++){
        let skillarr = []
        for(let j = 0; j<allCoders[i].skills.length; j++){
        console.log("!!!!!!!!!!!!!", allCoders[i].skills[j].skill_name)
            skillarr.push(allCoders[i].skills[j].skill_name)
           allcodersskillsobj[allCoders[i].id] = skillarr
        }

    }

    console.log("allcokerskillsobj", allcodersskillsobj)
    let entries = Object.entries(allcodersskillsobj)

    console.log("entries are", entries)

    let validCoderIds = []

    //checks to see if an array is another array

    for(let i = 0; i<entries.length; i++){
        const containsAll = neededSkills.sort().every(element => {
            return entries[i][1].sort().includes(element)
        })

        if(containsAll) validCoderIds.push(parseInt(entries[i][0]))


    }

    console.log("valid coder ids is", validCoderIds)

    let validCoders = []

    for(let i = 0; i<validCoderIds.length; i++){
        let validCoder = allCoders.filter(coder => coder.id === validCoderIds[i])[0]
        validCoders.push(validCoder)
    }

    console.log("valid coders are" , validCoders)

    console.log("coder Skillsssss", coderSkillss)

    // console.log("ALL CODERS IS", allCoders)



    const handleCoderSubmit = (coderId) => {

        console.log("Coder id being sent in is", coderId)
        console.log("project id being sent in is ", projectId)

        dispatch(createproject(0, coderId, projectId ))
        history.push(`/projects/confirmation/${projectId}`)
    }

    return (

        <div className="select-coder-page-container">
        <h1 classname='select-a-coder-title'>Select A Coder</h1>

            <div className="coder-cards-container">
                {validCoders.map(coder => {
                    return (
                    <div className="coder-shortbio-container">
                        <div>{coder.user.first_name} {coder.user.last_name}</div>
                        <div>Bio: {coder.bio}</div>
                        <div>Experience: {coder.experience}</div>
                        {/* <button className="view-coder-profile-button"><NavLink className="view-coder-profile-button" to={`/coders/${coder.id}`}>View Profile</NavLink></button> */}
                        <button className = 'choose-coder-profile-button' onClick = {() => handleCoderSubmit(coder.id)}>Choose this coder</button>
                    </div>

                    )
                })}

        </div>
        </div>


    )

}

export default SelectCoderForProject
