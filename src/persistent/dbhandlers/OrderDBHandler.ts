import { WithId, Document } from "mongodb";
import { OrderData, orderDataPattern } from "../dtos/OrderData";
import IOderDBHandler from "../interfaces/IOrderDBHandler";
import { AccessCollection, accessCollection, convertDocument } from "./DBHandler";

//Collection Name: 
const collectionName : string = "Order";

//Pattern:
const pattern : OrderData = orderDataPattern;

export class OrderDBHandler implements IOderDBHandler{
    //Constuctor:
    public constructor(){}

    //Methods:
    public async get(id : string) : Promise<OrderData | undefined>{
        //Access to collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try getting order
        try{
            var order : WithId<Document> | null = await collection.findOne({id:id});
        }catch(error:any){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Order not found
        if(!order){
            return;
        }

        //Convert document and return
        return convertDocument(order, pattern);
    }

    public async getAll() : Promise<OrderData[]>{
        //Access to collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try getting orders
        try{
            var orders : WithId<Document>[] = await collection.find().toArray();
        }catch(error:any){
            connection.close();
            throw error;
        }
        
        //Close connection
        connection.close();

        //Convert documents and return
        return orders.map(order => convertDocument(order, pattern));
    }   

    public async getByFilter(filter:any) : Promise<OrderData[]>{
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting
        try {
            var orders : WithId<Document>[] = await collection.find(filter).toArray();
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Converting and return
        return orders.map(document => convertDocument(document,pattern));
    }

    public async insert(target: OrderData): Promise<void> {
        // Try accessing the collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try inserting order into db
        try {
            await collection.insertOne(target);
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }

    public async update(target: OrderData): Promise<void> {
        // Try accessing the collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try updating order
        try {
            await collection.updateOne({ id: target.id }, { $set: target });
        } catch (error) {
            connection.close();
            throw error;
        }

        // Close connection
        connection.close();
    }

    public async delete(id: string): Promise<void> {
        // Try accessing the collection
        try {
            var { connection, collection }: AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try deleting order
        try {
            await collection.deleteOne({ id: id });
        } catch (error) {
            connection.close();
            throw error;
        }
    }
}