import { UserData } from "../persistent/dtos/UserData";
import IUserService from "./interfaces/IUserService";
import User, { UserPermission } from "./models/User";
import { UserDBHandler } from "../persistent/dbhandlers/UserDBHandler";
import IUserDBHandler from "../persistent/interfaces/IUserDBHandler";
import IOrderService from "./interfaces/IOrderService";



export default class UserService implements IUserService {
    //Fields:
    private userDBHandler: IUserDBHandler;
    private orderService?: IOrderService; 

    //Constructor
    public constructor(orderService?: IOrderService) {
        this.userDBHandler = new UserDBHandler();
        this.orderService = orderService;
    }

    //Methods:
    async getByFilter(filter: any, path: any[]): Promise<User[]> {
        //Try getting data
        try {
            var usersData = await this.userDBHandler.getByFilter(filter);
        } catch (error) {
            throw error;
        }

        //Try converting
        try {
            var users = await this.multiDataToUser(usersData, path);
        } catch (error) {
            throw error;
        }

        //Return
        return users;
    }
    async get(username: string, path: any[]): Promise<User | undefined> {
        //Try getting data
        try {
            var userData: UserData | undefined = await this.userDBHandler.get(username);
        } catch (error) {
            throw error;
        }

        //User data not found
        if (!userData) {
            return;
        }

        //Try converting
        try {
            var user: User = await this.dataToUser(userData, path);
        } catch (error) {
            throw error
        }

        //Return
        return user;
    }

    async getAll(path : any[]): Promise<User[]> {
        //Try getting data
        try {
            var usersData = await this.userDBHandler.getAll();
        } catch (error) {
            throw error;
        }

        //Converting
        try {
            var users: User[] = await this.multiDataToUser(usersData, path);
        } catch (error) {
            throw error;
        }

        //Return
        return users;
    }

    async insert(user: User): Promise<void> {
        //Converting user to data
        const userData: UserData = this.userToData(user);

        //Try inserting
        try {
            await this.userDBHandler.insert(userData);
        } catch (error: any) {
            throw error;
        }
    }

    async update(user: User): Promise<void> {
        //Converting user to data
        const userData: UserData = this.userToData(user);

        //Try updating
        try {
            await this.userDBHandler.update(userData);
        } catch (error: any) {
            throw error;
        }
    }

    async delete(username: any) {
        //Try deleting
        try {
            await this.userDBHandler.delete(username);
        } catch (error: any) {
            throw error;
        }
    }

    //Local methods 
    private userToData(user: User): UserData {
        return {
            username: user.Username as string,
            password: user.Password as string,
            fullName: user.FullName as string,
            permission: user.Permission as string
        }
    }
    private async dataToUser(data: UserData, path: any[]): Promise<User> {
        //Seft definition:
        const seft: UserService = this;

        //Local function
        function precheck(username: string, path: any[]): User | undefined {
            for (const obj of path) {
                if (obj instanceof User) {
                    if (obj.Username === username) {
                        return obj;
                    }
                }
            }
        }

        async function getOrders(username: string, userT: User, path: any[]): Promise<void> {
            if (seft.orderService) {
                //Get order list of user
                try {
                    userT.Orders = await seft.orderService.getByFilter({ createdBy: username }, path);
                } catch (error) {
                    throw error;
                }
            }
        }

        //User declaration
        let user: User | undefined;

        //Path precheck
        user = precheck(data.username, path);

        //Return if found path 
        if (user) {
            return user;
        }

        //If not found user
        user = new User();

        //Copy fields:
        user.Username = data.username;
        user.Password = data.password;
        user.FullName = data.fullName;
        user.Permission = data.permission as UserPermission;

        //Push path
        path.push(user);

        //Dependencies handling
        try {
            await getOrders(data.username, user, path);
        } catch (error) {
            throw error
        }

        //Return
        return user;
    }

    private async multiDataToUser(data: UserData[], path: any[]): Promise<User[]> {
        const result: User[] = [];

        //Try converting
        try {
            for (const UserData of data) {
                result.push(await this.dataToUser(UserData, path));
            }
        } catch (error) {
            throw error;
        }

        return result;
    }

    //Getter setter
    public get OrderService(): IOrderService | undefined {
        return this.orderService;
    }

    public set OrderService(orderService: IOrderService | undefined) {
        this.orderService = orderService;
    }
}