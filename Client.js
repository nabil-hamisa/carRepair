import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {createUploadLink} from "apollo-upload-client";

let client;

const uploadLink = createUploadLink({
    uri:"/graphql"
});
const setToken =(token:String)=> {
    return setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            }
        }
    });
};
export const cache = new InMemoryCache();
export const createClient =async (token:?String):ApolloClient=>{
    client = await new ApolloClient({
        link: typeof token == "undefined" ? uploadLink : setToken(token).concat(uploadLink),
        cache
    });
    return client;
};
export default ():ApolloClient=>client;
