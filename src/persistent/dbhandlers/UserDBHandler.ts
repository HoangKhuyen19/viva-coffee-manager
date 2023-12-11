import { Document, WithId } from "mongodb";
import { UserData, userDataPattern } from "../dtos/UserData";
import IUserDBHandler from "../interfaces/IUserDBHandler";
import { AccessCollection, accessCollection, convertDocument } from "./DBHandler";


//CollectionName
const collectionName:string = "User";

//Pattern
const pattern: UserData = userDataPattern;

export class UserDBHandler implements IUserDBHandler{
    //Constructor:
    public constructor(){

    }

    //Methods
    public async get(username: string): Promise<UserData | undefined> {
        //Access to collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try getting document
        try{
            var document : WithId<Document> | null = await collection.findOne({username : username})
        }catch(error){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Document not found
        if(!document){
            return;
        }

        //Convert document and return
        return convertDocument(document,pattern);
    }
    
    
    public async getAll(): Promise<UserData[]> {
        //Access to collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try getting all
        try{
            var documents : WithId<Document>[] = await collection.find().toArray();
        }catch(error : any){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        const result: UserData[] = [];
        //Convert documents
        documents.forEach(
            function(document: WithId<Document>){
                result.push(convertDocument(document,pattern));
            }
        );  

        return result;

    }
    public async getByFilter(filter: any): Promise<UserData[]> {
        //Try accessing collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try getting documents
        try{
            var documents : WithId<Document>[] = await collection.find(filter).toArray();
        }catch(error :any){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        const result : UserData[] = [];
        //Converting documents
        documents.forEach(
            function(document: WithId<Document>){
                result.push(convertDocument(document,pattern));
            }
        );

        return result;
    }
    public async insert(target: UserData): Promise<void> {
        //Try accessing to collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try inserting product into db
        try{
            await collection.insertOne(target);
        }catch(error :any){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }
    public async update(target: UserData): Promise<void> {
        //Try accessing to collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try updating target into db   
        try{
            await collection.updateOne({username:target.username},{$set: target});
        }catch(error: any){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }
    public async delete(filter: any): Promise<void> {
        //Try acessing to collection
        try{
            var {connection, collection} :AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try deleting 
        try{
            await collection.deleteOne({username: filter});
        }catch(error : any){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }
}