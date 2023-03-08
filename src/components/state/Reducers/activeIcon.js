export const activeIcon = (state = {
    activeIcon: false
}, action) => {
    if (action.type === "activeHomeIcon") {
        return {
            ...state,
            activeIcon: action.payload
        }
    }
    return state

}