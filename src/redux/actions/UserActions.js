export const ActionTypes = {
    set_current_user: "ADD_CURRENT",
    remove_user: "REMOVE_USER"
}

export interface ActionModel {
    type: string | "ADD_CURRENT" | "REMOVE_CURRENT",
    payload: any
}

export const addUser = (user: { userid: integer }): ActionModel => ({
    type: ActionTypes.set_current_user,
    payload: user
})

export const removeUser = (user: { userid: integer }): ActionModel => ({
    type: ActionTypes.remove_user,
    payload: user
})