export const SWITCH_LOGIN = 'SWITCH_LOGIN';
export const switchLogin = (id, username, firstName, lastName, password, token) => {
    return {
        type: SWITCH_LOGIN,
        id: id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        token: token,

    };
};

