import type { ActionModel } from "../actions/UserActions";

const DEFAULT_USERS = []

export const UserReducer = (state = DEFAULT_USERS, action: ActionModel) => {

    console.log("Action",action.type,"State ->",state)

    switch (action.type) {
        case "ADD_CURRENT":
            return [...state, action.payload];

        case "REMOVE_USER":
            return state.filter(value => (value.userid != action.payload.userid));
            
        default:
            return state;
    }

}