export default interface IRepository<T>{

    create(entity:any): Promise<T>;

    findOne(fieldValues: any, optionalIncludeEntity?:any): Promise<T>;

    findById(id: any, optionalIncludeEntity?:any): Promise<T> ;

    find(optinalwherQuery?:any, optionalIncludeEntity?:any): Promise<T[]>;

    delete(entity:any): Promise<void>;

    update(id: any, updatedData: Partial<T>): Promise<T>;
}