store = {
    session: {},
    users: {
        allUsers: {
            [userId]: {
                usersData
            }
        },
        singleUser: {
            [userId]: {
                userData
            },
            Coder: {
                coderData
            }
        }
    },
    coders: {
        allCoders: {
            [coderId]: {
                codersData
            }
        },
        singleCoder: {
            [coderId]: {
                coderData
            },
            User: {
                userData
            },
            Skills: {
                skillsData
            },
            Projects: {
                projectsData
            },
            Reviews: {
                reviewsData
            }
        }
    },
    skills: {
        allSkills: {
            [skillId]: {
                skillsData
            }
        },
        singleSkill: {
            [skillId]: {
                skillData
            }
        }
    },
    projects: {
        allProjects: {
            [projectId]: {
                projectsData
            }
        },
        singleProject: {
            [projectId]: {
                projectData
            },
            User: {
                userData
            },
            Coder: {
                coderData
            },
            Skills: {
                skillsData
            }
        }
    },
    reviews: {
        allReviews: {
            [reviewId]: {
                reviewsData
            }
        },
        singleReview: {
            [reviewId]: {
                reviewData
            },
            User: {
                userData
            },
            Coder: {
                coderData
            }
        }
    },
    searchBar: {
        results: {
            // Need to fill in this value
            resultsData
        }
    }
}
