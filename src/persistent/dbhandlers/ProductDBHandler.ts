import { Document, WithId } from "mongodb";
import { ProductData, productDataPattern } from "../dtos/ProductData";
import IProductDBHandler from "../interfaces/IProductDBHandler";
import { AccessCollection, accessCollection, convertDocument } from "./DBHandler";

//Collection Name
const collectionName : string = "Product";

//Pattern
const pattern : ProductData = productDataPattern;

export class ProductDBHandler implements IProductDBHandler{
    //Constructor:
    public constructor(){

    }

    //Methods:
    public async get(id :string) : Promise<ProductData | undefined>{
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting target
        try {
            var document : WithId<Document> | null = await collection.findOne({id:id});
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Document not found
        if(!document){
            return;
        }
        
        //Converting document and return
        return convertDocument(document,pattern);
    }

    public async getAll() : Promise<ProductData[]> {
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting all
        try {
            var documents : WithId<Document>[] = await collection.find().toArray();
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        const result : ProductData[] = [];
        //Converting document and return

        documents.forEach(
            function(document: WithId<Document>){
                result.push(convertDocument(document,pattern));
            }
        );
        return result;
    }

    public async getByFilter(filter:any) : Promise<ProductData[]>{
        //Try accessing to collection
        try {
            var { connection, collection }: AccessCollection =  await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting documents
        try {
            var documents : WithId<Document> [] = await collection.find(filter).toArray();
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        const result : ProductData[] = [];
        //Converting documents
        documents.forEach(
            function(document: WithId<Document>){
                result.push(convertDocument(document,pattern));
            }
        );
        return result;
    }
    public async insert(target: ProductData): Promise<void> {
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try inserting product into db
        try {
            await collection.insertOne(target);
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }

    public async update(target : ProductData) : Promise<void>{
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try updating product to db
        try {
            await collection.updateOne({id:target.id},{$set: target})
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }

    public async delete(id: any): Promise<void> {
        //Try accesiing to collection
        try {
            var {connection, collection} :AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try deleting 
        try {
            await collection.deleteOne({id:id});
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }
}