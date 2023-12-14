export default interface IModelService<T>{
    getAll(path : any[]): Promise<T[]>
    getByFilter(filter:any, path : any[]) : Promise<T[]>
    insert(target: T) : Promise<void>
    update(target: T) : Promise<void>
    delete(filter : any) : Promise<void>
}