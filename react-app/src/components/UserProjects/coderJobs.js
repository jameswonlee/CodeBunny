
// let userJobs = allProjects.filter(project => project.coder.user_id === user.id)
// // let coderUser = coder.user_id

// let completedJobs = userJobs.filter(project => project.completed === true)
// let upcomingJobs = userJobs.filter(project => project.completed === false)

// console.log("userJObs", userJobs)


{/* <div className='projects-container'>
                    < div className = 'upcoming-container' >
                        <h1 className = 'projects-title' >Upcoming Jobs </h1>
                        {upcomingJobs.length? upcomingJobs.map(project=>{

                            return(
                                <>
                                    <div>
                                        <div>Project Name: {project.name}</div>
                                        <div>Start-Date:{project.start_date}</div>
                                        <div>End-Date: {project.end_date}</div>
                                        <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
                                        <div>Owner's Contact Info: {project.owner.email}</div>
                                        {/* <div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div> */}
                                        <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
                                        <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink>
                                    </div>
                                </>
                            )
                        }) : (<h2>No Upcoming Jobs!</h2>) }


                    </div>
                    < div className = 'completed-container' >
                        <h1 className = 'projects-title' >Completed Jobs </h1>
                        {completedJobs.length? completedJobs.map(project=>{

                            return(
                                <>
                                    <div>
                                        <div>Project Name: {project.name}</div>
                                        <div>Start-Date:{project.start_date}</div>
                                        <div>End-Date: {project.end_date}</div>
                                        <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
                                        <div>Owner's Contact Info: {project.owner.email}</div>
                                        {/* <div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div> */}
                                        <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
                                        <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink>

                                    </div>
                                </>
                            )
                        }) : (<h2>You haven't completed any jobs yet!</h2>) }


                    </div>
                </div> */}
