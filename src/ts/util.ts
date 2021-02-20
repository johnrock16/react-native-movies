/**
 * A Simple function to make the method GET FETCH
 * @param url - url of the fetch
 * @param param1 - a object with params and headers
 * @return - Promise 
 */
export const getRequest=(url:string,{params={},headers={}}={})=>{
    console.log(url+'?'+queryString(params))
    return fetch(url+'?'+queryString(params),{
        method:'GET',
        headers:{
            'content-type':'application/json',
            'accept':'application/json',
            ...headers
        }
    }).catch((e)=>{
        console.log(e);
    })
}

/**
 * Resolve a Promise of fetch and returns a object 
 * @param resolve - promise resolve gived by fetch
 * @param format - format of the result of resolve
 * @returns - the resolve converted
 */
export const resolveFetch= async(resolve:any,format:string='json')=>{
    if(resolve?.status===200 || resolve?.status===304){
        const result = await resolve[format]();
        return {result};
    }
    if(resolve?.status===404) return {status:resolve.status, error:'not Found'}
    if(resolve?.status>=500) return {status:resolve.status, error:'error on server'}
    return {status:(resolve?.status)?resolve.status:undefined, error:'error on resolve'}
}

/**
 * Transform a object with contains data about GET params and turns on URL string 
 * @param params - object of params of GET REQUEST to convert
 * @return - url param string
 */
export const queryString =(params:any)=> Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
}).join('&');

/**
 * Create all onHandleChange e handleChange of a React's State 
 * @param initialState - initialState of a React State
 * @param setState - setState of a React STate
 * @return onHandleChange and handleChange
 */
export const buildHandleChanger=(initialState:object,setState:Function)=>{
    let object={};
    Object.keys(initialState).forEach((item)=>(object={...object,[item]:(v:any)=>setState((pv:object)=>({...pv,[item]:v}))}))
    return object
}
/**
 * Create a simple HandleChange
 * @param key - key of the state has been changed
 * @param value - value to change the state
 * @param setState - setState of a React STate
 * @return onHandleChange and handleChange
 */
export const handleChange=(key:string,value:any,setState:Function)=>{
    setState((pv:object)=>({...pv,[key]:value}))
}