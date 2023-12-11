import { Collection, Db, Document, MongoClient, WithId } from "mongodb";

const hostName:string = "localhost";
const port:string = "27017";
const url:string = `mongodb://${hostName}:${port}`
const dbName:string = "VivaCoffee";

//interface 
export interface AccessCollection{
    connection: MongoClient
    collection: Collection;
    db: Db;
}

export async function accessCollection(collectionName :string) :Promise<AccessCollection> {
    //Connect to MongoDB
    try{
        var connection: MongoClient = await MongoClient.connect(url);
    }catch(error :any){
        throw error;
    }
    
    const db: Db =  connection.db(dbName);

    //Access to collection
    const collection: Collection<Document> = db.collection(collectionName);

    //Return
    return {connection, db, collection}
}

//Convert document
export function convertDocument<T>(document:WithId<Document>, pattern: T): T{
    const result: any = {}

    //convert
    for(let fieldName in pattern){
        result[fieldName] = document[fieldName];
    }

    return result;
}

