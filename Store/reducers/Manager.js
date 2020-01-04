import {SWITCH_LOGIN} from '../actions/Manager';

const initialState = {
    loggedIn: false,
    isManger: false,
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    token: '',

};
const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_LOGIN:
            if (!state.loggedIn) {
                return {
                    ...state,
                    loggedIn: action.loggedIn,
                    isManger: action.isManager,
                    id: action.id,
                    username: action.username,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    password: action.password,
                    token: action.token,
                };
            } else {
                return {
                    loggedIn: false,
                    isManger: false,
                    id: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    token: '',
                }

            }
            break;
        default:
            return state;
    }
    return state;
};
export default managerReducer;
