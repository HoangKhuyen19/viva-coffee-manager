import { UserData } from "../dtos/UserData";
import IDBHandler from "./IDBHandler";

export default interface IUserDBHandler extends IDBHandler<UserData>{
    get(username: string) : Promise<UserData | undefined>;
}