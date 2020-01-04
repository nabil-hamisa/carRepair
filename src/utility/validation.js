const validate = (val, rules) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'minLength': {
                isValid = isValid && minlengthValidator(val, rules[rule]);
            }
                break;
            case 'maxLength': {
                isValid = isValid && maxlengthValidator(val, rules[rule]);
            }
                break;
            case'equalTo':
                isValid = isValid && equalTOValidator(val, rules[rule]);
                break;
            case'minAge':
                isValid = isValid && minAge(val, rules[rule]);
                break;
            default:
                isValid = true;
        }

    }
    return isValid;
};

const minlengthValidator = (val, minLength) => {
    return val.length >= minLength;

};

const maxlengthValidator = (val, maxLength) => {
    return val.length <= maxLength;

};
const equalTOValidator = (val, checkValue) => {
    return val === checkValue;
};
const minAge = (val, minAge) => {
    let currentYer=new Date().getFullYear();
    let dob=new Date(val).getFullYear();
    return ( (currentYer - dob) >= minAge );

};

export default validate;
