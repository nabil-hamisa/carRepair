export default {
    isManager: false,
    loggedIn: false,
    me: {},
    stats: {},
    token: '',

    success: {
        addMechanician:false,
        addTask:false,
        addClient: false,
        addCar: false,
        carFound: false,
        tasks:false
    },
    errors: {
        addMechanician:false,
        addTask:false,
        login: {},
        register: {}, addClient: false,
        addCar: false,
        carFound: false,
        tasks:false
    },
    loads: {
        login: false,
    },
    data: {},
    brands: {},
    models: {},
    clientFound: null,
    carFound: null,
    mechanicians:null,
    addTask:null,
    tasks:{
        tasks:[]


    },
    addMechanician:{}

};
