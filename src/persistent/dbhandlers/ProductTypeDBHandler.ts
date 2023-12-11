import { WithId, Document } from "mongodb";
import { ProductTypeData, productTypeDataPattern } from "../dtos/ProductTypeData";
import IProductTypeDBHandler from "../interfaces/IProductTypeDBHandler";
import { AccessCollection, accessCollection, convertDocument } from "./DBHandler";

//CollectionName:
const collectionName: string = "ProductType";

//Pattern
const pattern: ProductTypeData = productTypeDataPattern;

export class ProductTypeDBHandler implements IProductTypeDBHandler {
    //Constructor:
    public constructor() {

    }

    //Methods
    public async get(id: string): Promise<ProductTypeData | undefined> {
        //Try accessing to collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting product type
        try {
            var document: WithId<Document> | null = await collection.findOne({ id: id });
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Document not found
        if (!document) {
            return;
        }

        //Converting document and return
        return convertDocument(document, pattern);
    }
    public async getAll(): Promise<ProductTypeData[]> {
        //Try accessing to collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting documents
        try {
            var documents: WithId<Document>[] = await collection.find().toArray();
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Converting documents
        const result: ProductTypeData[] = [];
        documents.forEach(
            function (document: WithId<Document>) {
                result.push(convertDocument(document, pattern));
            }
        );

        return result;
    }
    public async getByFilter(filter: any): Promise<ProductTypeData[]> {
        //Try accessing to collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting documents
        try {
            var documents: WithId<Document>[] = await collection.find(filter).toArray();
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Converting documents
        const result: ProductTypeData[] = [];
        documents.forEach(
            function (document: WithId<Document>) {
                result.push(convertDocument(document, pattern));
            }
        );

        return result;
    }
    public async insert(target: ProductTypeData): Promise<void> {
        //Try accessing to collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try inserting product type
        try {
            await collection.insertOne(target);
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }
    public async update(target: ProductTypeData): Promise<void> {
        //Try accessing to collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try updating product type
        try {
            await collection.updateOne({ id: target.id }, { $set: target })
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }
    public async delete(filter: any): Promise<void> {
        //Try accessing to collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try deleting 
        try {
            await collection.deleteOne({id: filter});
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }

}