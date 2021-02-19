import { API_KEY } from "../../config";
import { getRequest, resolveFetch } from "./util";

const API_SERVER='http://www.omdbapi.com';

/** 
 * A simple function to make GET fetchs and resolve their
 * @param textUrl -  url to make fetch
 * @param params - params to insert on GET
 * @param headers - headers to make fetch
 * @returns - {result:any} || {error:any}
 */
export const searchAPI = async(textUrl:string,params={},headers={})=>{
    const url=`${API_SERVER}${textUrl}`;
    const resolve= await getRequest(url,{params:{...params,apikey:API_KEY},headers});
    const result = await resolveFetch(resolve);
    return result;
}