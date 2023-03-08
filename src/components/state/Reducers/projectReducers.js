export const projectReducers = (state = {
    projectDetails: [],
    membersDetails: [],
    defaultTab: ""
}, action) => {
    if (action.type === "projectItem") {
        return {
            ...state,
            projectDetails: action.payload
        }
    }
    if (action.type === "membersDetails") {
        return {
            ...state,
            membersDetails: action.payload
        }
    }
    if (action.type === "defaultTab") {
        return {
            ...state,
            defaultTab: action.payload
        }
    }
    return state

}