import gql from "graphql-tag";
export const MANAGER_LOGIN = gql`
    query ManagerLogin($username:String!,$password:String!){
        managerLogin(data:{username:$username,password:$password}){token,
            me{id,
                firstName,
                lastName,
                username,
                dob,
                language
            }
        }
    }
`;
export const MANAGER_USERNAME_EXISTS = gql`
    query ManagerUsernameExists($username:String!){
        managerUsernameExists(username:$username)
    }
`;
export const MECHANICIAN_USERNAME_EXISTS = gql`
    query MechanicianUsernameExists($username:String!){
        mechanicianUsernameExists(username:$username)
    }
`;
export const MECHANICIAN_LOGIN = gql`
    query MechanicianLogin($username:String!,$password:String!){
        mechanicianLogin(data:{username:$username,password:$password}){token,
            me{id,
                firstName,
                lastName,
                username,
                dob,
                language
            }
        }
    }
`;
export const GET_MECHANICIANS = gql`
    query Mechanicians($index:Int!){
        mechanicians(index:$index){
            totalPages,
            mechanicians{
                id,
                firstName,
                lastName,
                username,
                dob
            }
        }
    }
`;
export const GET_PIECES = gql`
    query Pieces($index:Int!){
        pieces(index:$index){
            totalPages,
            pieces{
                name,
                ref,
                price
            }
        }
    }
`;
export const GET_CLIENTS = gql`
    query Clients($index:Int!){
        clients(index:$index){
            totalPages,
            clients{
                id,
                firstName,
                lastName,
                dob,
                cin,
                cars{
                    id,
                    number,
                    model{
                        name,
                        brand{
                            name
                        }
                    }
                }
            }
        }
    }
`;
export const GET_SHEETS = gql`
    query Sheets($index:Int!){
        sheets(index:$index){
            totalPages,
            sheets{
                id,
                date,
                car{
                    id
                    number
                    model{
                        id
                        name,
                        brand{
                            id
                            name
                        }
                    }
                    client{
                        id
                        firstName
                        lastName
                        cin
                    }
                }
            }
        }
    }
`;
export const GET_BRANDS = gql`
    query Brands{
        brands{
            id,
            name
        }
    }
`;
export const GET_MODELS_BY_BRAND = gql`
    query GetModelsByBrand($id:ID!){
        modelsByBrand(id:$id){
            id,
            name
        }
    }
`;
export const GET_TASKS = gql`
    query GetTasks($index:Int!){
        tasks(index:$index){
            totalPages,
            tasks{
                id
                name
                startDate
                endDate
                price
                mechanician{
                    id
                    firstName
                    lastName
                    username
                }
                sheet{
                    id
                }
            }
        }
    }
`;
export const GET_BILLS = gql`
    query GetBills{
        bills{
            id
            customPrice
            discount
            date
            payBefore
            sheet{
                car{
                    client{
                        id
                        firstName
                        lastName
                    }
                }
                tasks{
                    price
                    mechanician{
                        id
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;
export const GET_STATS = gql`
    query GetStats{
        stats{
            mechanicians
            cars
            clients
            income
        }
    }
`;
export const REGISTER = gql`
    mutation Register($username:String!,$firstName:String!,$lastName:String!,$password:String!,$dob:DateTime!,$language:String!){
        register(data:{
            username:$username,firstName:$firstName,lastName:$lastName,password:$password,dob:$dob,language:$language
        }){
            token,
            me{
                id
                firstName,
                lastName,
                username,
                dob,
                language
            }
        }
    }
`;
export const ADD_MECHANICIAN = gql`
    mutation AddMechanician($firstName:String!,$lastName:String!,$username:String!,$password:String!,$dob:DateTime!){
        addMechanician(data:{firstName:$firstName,lastName:$lastName,username:$username,password:$password,dob:$dob}){
            id
            firstName
            lastName
            username
            dob
            language
        }
    }
`;
export const DELETE_MECHANICAN = gql`
    mutation DeleteMechanician($id:ID!){
        deleteMechanician(id:$id){
            id
            firstName
            lastName
            username
            dob
            language
        }
    }
`;
export const UPDATE_MECHANICIAN = gql`
    mutation UpdateMechanician($id:ID!,$firstName:String,$lastName:String,$username:String,$password:String,$oldPassword:String,$dob:DateTime){
        updateMechanician(id:$id,data:{
            firstName:$firstName,
            lastName:$lastName,
            username:$username,
            password:$password,
            oldPassword:$oldPassword,
            dob:$dob
        }){
            id
            firstName
            lastName
            username
            dob
            language
        }
    }
`;
export const ADD_PIECE = gql`
    mutation AddPiece($name:String!,$ref:String!,$price:Float!){
        addPiece(data:{
            name:$name,ref:$ref,price:$price
        }){
            id
            name
            ref
            price
        }
    }
`;
export const DELETE_PIECE = gql`
    mutation DeletePiece($id:ID!){
        deletePiece(id:$id){
            id
            name
            ref
            price
        }
    }
`;
export const UPDATE_PIECE = gql`
    mutation UpdatePiece($id:ID!,$name:String,$price:String){
        updatePiece(id:$id,data:{
            name:$name,
            price:$price
        }){
            id
            name
            ref
            price
        }
    }
`;
export const ADD_CLIENT = gql`
    mutation AddClient($firstName:String!,$lastName:String!,$dob:DateTime!,$cin:String!,$carNumber:String!,$carModel:ID!){
        addClient(data:{
            firstName:$firstName,
            lastName:$lastName,
            dob:$dob,
            cin:$cin
            carNumber:$carNumber,
            carModel:$carModel
        }){
            id
            firstName,
            lastName,
            dob,
            cin
        }
    }
`;
export const DELETE_CLIENT = gql`
    mutation DeleteClient($id:ID!){
        deleteClient(id:$id){
            id,
            firstName,
            lastName,
            dob,
            cin
        }
    }
`;
export const UPDATE_CLIENT = gql`
    mutation UpdateClient($id:ID!,$firstName:String,$lastName:String,$dob:DateTime,$cin:String){
        updateClient(id:$id,data:{
            firstName:$firstName,
            lastName:$lastName,
            dob:$dob,
            cin:$cin
        }){
            id,
            firstName,
            lastName,
            dob,
            cin
        }
    }
`;
export const ADD_SHEET = gql`
    mutation AddSheet($car:ID!){
        addSheet(car:$car){
            id
            car{
                id
                number
                model{
                    id,
                    name,
                    brand{
                        id
                        name
                    }
                }
            }
            date
        }
    }
`;
export const DELETE_SHEET = gql`
    mutation DeleteSheet($id:ID!){
        deleteSheet(id:$id){
            id
        }
    }
`;
export const ADD_TASK = gql`
    mutation AddTask($name:String!,$startDate:DateTime!,$endDate:DateTime,$price:Float,$sheet:ID!,$mechanician:ID!){
        addTask(data:{
            name:$name,
            startDate:$startDate,
            endDate:$endDate,
            price:$price,
            sheet:$sheet,
            mechanician:$mechanician
        }){
            id,
            startDate,
            endDate,
            mechanician{
                id
                firstName
                lastName
            },
            sheet{
                car{
                    id
                    number
                    model{
                        id
                        name
                        brand{
                            id
                            name
                        }
                    }
                    client{
                        id
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;
export const DELETE_TASK = gql`
    mutation DeleteTask($id:ID!){
        deleteTask(id:$id){
            id
        }
    }
`;
export const ADD_PIECES_TO_TASK = gql`
    mutation AddPiecesToTask($id:ID!,$pieces:[ID!]!){
        addPiecesToTask(id:$id,pieces:$pieces){
            id
        }
    }
`;
export const UPDATE_TASK = gql`
    mutation UpdateTask($id:ID!,$name:String,$startDate:DateTime,$endDate:DateTime,$price:Float){
        updateTask(id:$id,data:{
            name:$name
            startDate:$startDate
            endDate:$endDate
            price:$price
        }){
            id,
        }
    }
`;
export const CREATE_BILL = gql`
    mutation CreateBill($sheet:ID!,$customPrice:Float,$discount:Float,$date:DateTime,$payBefore:DateTime){
        createBill(data:{
            sheet:$sheet,customPrice:$customPrice,discount:$discount,data:$date,
            payBefore:$payBefore
        }){
            id
            sheet{
                car{
                    id
                    model{
                        id
                        name
                        brand{
                            id
                            name
                        }
                    }
                    client{
                        id
                        firstName
                        lastName
                    }
                }
                tasks{
                    pieces{
                        id
                        name
                        ref
                        price
                    }
                    mechanician{
                        id
                        firstName
                        lastName
                    }
                }
            }
            customPrice
            discount
            date
            payBefore
        }
    }
`;
export const UPDATE_BILL = gql`
    mutation UpdateBill($id:ID!,$customPrice:Float,$discount:Float,$payBefore:DateTime){
        updateBill(id:$id,data:{
            customPrice:$customPrice
            discount:$discount
            payBefore:$payBefore
        }){
            id
            sheet{
                car{
                    id
                    model{
                        id
                        name
                        brand{
                            id
                            name
                        }
                    }
                    client{
                        id
                        firstName
                        lastName
                    }
                }
                tasks{
                    pieces{
                        id
                        name
                        ref
                        price
                    }
                    mechanician{
                        id
                        firstName
                        lastName
                    }
                }
            }
            customPrice
            discount
            date
            payBefore
        }
    }
`;
export const GET_CARS = gql`
    query Cars($index:Int!){
        cars(index:$index){
            totalPages
            cars{
                id
                number
                model{
                    id
                    name
                    brand{
                        id
                        name
                    }
                }
            }
        }
    }
`;
export const DELETE_CAR = gql`
    mutation DeleteCar($id:ID!){
        deleteCar(id:$id){
            id
            number,
            model{
                id
                name
                brand{
                    id
                    name
                }
            }
        }
    }
`;
export const SEARCH_CLIENT = gql`
    query SearchClient($str:String!){
        searchClient(str:$str){
            id
            firstName
            lastName
            cin
            dob
        }
    }
`;
export const SEARCH_MECHANICIAN = gql`
    query SearchMechanician($str:String!){
        searchMechanician(str:$str){
            id
            firstName
            lastName
            username
        }
    }
`;
export const SEARCH_SHEET = gql`
    query SearchSheet($str:String!){
        searchSheet(str:$str){
            id
            car{
                id
                model{
                    id
                    name
                    brand{
                        id
                        name
                    }
                }
                client{
                    id
                    firstName
                    lastName
                }
            }
        }
    }
`;
export const TASKS_BY_SHEET = gql`
    query TasksBySheet($id:ID!,$index:Int!){
        tasksBySheet(id:$id,index:$index){
            totalPages
            tasks{
                id
                startDate
                endDate
                mechanician{
                    id
                    firstName
                    lastName
                }
            }
        }
    }
`;
export const SEARCH_CAR = gql`
    query SearchChat($str: String!) {
        searchCar(str: $str) {
            id
            client {
                id
                firstName
                lastName
                cin
            }
            model {
                name
                brand {
                    name
                }
            }
            number
            sheets {
                id
                date
                bill {
                    id
                    customPrice,
                }
                tasks{name
                    startDate
                    endDate
                    pieces{
                        name
                        price
                    }
                    mechanician{
                        firstName
                        lastName

                    }

                }
            }
        }
    }

`;
export const ADD_CAR = gql`
    mutation AddCar($model:ID!,$number:String!,$client:ID!){
        addCar(data:{
            model:$model,number:$number,client:$client
        }){
            id,
            number,
            model{
                id
                name
                brand{
                    id
                    name
                }
            }
        }
    }
`;
export const UPDATE_CAR = gql`
    mutation UpdateCar($id:ID!,$model:ID,$number:String){
        updateCar(id:$id,data:{
            model:$model,number:$number
        }){
            id,
            number,
            model{
                id
                name
                brand{
                    id
                    name
                }
            }
        }
    }
`;
