import { WithId, Document } from "mongodb";
import { OrderDetailData, orderDetailDataPattern } from "../dtos/OrderDetailData";
import IOderDetailDBHandler from "../interfaces/IOderDetailDBHandler";
import { AccessCollection, accessCollection, convertDocument } from "./DBHandler";

//Collection Name:
const collectionName : string = "OrderDetail";

//Pattern:
const pattern : OrderDetailData = orderDetailDataPattern;

export class OrderDetailDBHandler implements IOderDetailDBHandler{
    //Constuctor:
    public constructor(){}

    //Methods:
    public async get(orderId:string, product:string) : Promise<OrderDetailData | undefined>{
        //Access to collection
        try{
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        }catch(error:any){
            throw error;
        }

        //Try getting order detail
        try{
            var document : WithId<Document> | null = await collection.findOne({orderId:orderId, product:product});
        }catch(error:any){
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Order detail not found
        if(!document){
            return;
        }

        //Convert document and return
        return convertDocument(document, pattern);
    }

    public async getAll() : Promise<OrderDetailData[]>{
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting all
        try {
            var oderDetails : WithId<Document>[] = await collection.find().toArray();
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Converting documents and return
        return oderDetails.map(oderDetail => convertDocument(oderDetail,pattern));
    }

    public async getByFilter(filter: any): Promise<OrderDetailData[]> {
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try getting all
        try {
            var oderDetails : WithId<Document>[] = await collection.find(filter).toArray();
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();

        //Converting documents and return
        return oderDetails.map(oderDetail => convertDocument(oderDetail,pattern));
    }

    public async insert(target: OrderDetailData): Promise<void> {
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try inserting order detail into db
        try {
            await collection.insertOne(target);
        } catch (error) {
            connection.close();
            throw error;
        }

        //Close connection
        connection.close();
    }

    public async update(target: OrderDetailData): Promise<void> {
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        // Try updating order detail
        try {
            await collection.updateOne({ orderId: target.orderId, product: target.product }, { $set: target });
        } catch (error) {
            connection.close();
            throw error;
        }

        // Close connection
        connection.close();
    }

    public async delete(filter: any): Promise<void> {
        //Try accessing to collection
        try {
            var {connection, collection} : AccessCollection = await accessCollection(collectionName);
        } catch (error) {
            throw error;
        }

        //Try deleting order detail
        try {
            await collection.deleteOne(filter);
        } catch (error) {
            connection.close();
            throw error;
        }

        // Close connection
        connection.close();
    }
}