import User from "../models/User";
import IModelService from "./IModelService";

export default interface IUserService extends IModelService<User>{
    get(username : string, path : any[]) : Promise<User | undefined>
}