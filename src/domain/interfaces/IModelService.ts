export default interface IModelService<T>{
    getAll(): Promise<T[]>
    getByFilter(filter:any) : Promise<T[]>
    insert(target: T) : Promise<void>
    update(target: T) : Promise<void>
    delete(filter : any) : Promise<void>
}