import { injectable } from 'inversify';
import IRepository from '../IRepository';
import { EntityManager } from 'typeorm';
import { AppDataSource } from '../../data_source';

@injectable()
export abstract class Repository<T> implements IRepository<T> {
  modelClass!: new () => any;

  private entityManager: EntityManager;

  constructor() {
    this.entityManager = AppDataSource.createEntityManager();
  }

  async create(entity: any): Promise<T> {
    const create = this.entityManager.create(this.modelClass, entity);
    return await this.entityManager.save(create);
  }

  async findOne(fieldValues: any, optionalIncludeEntity?: any): Promise<T> {
    return await this.entityManager.findOne(this.modelClass, {
      where: fieldValues,
      ...optionalIncludeEntity,
    });
  }

  async findById(id: any, optionalIncludeEntity?: any): Promise<T> {
    return await this.entityManager.findOne(this.modelClass, {
      where: { id: id },
      ...optionalIncludeEntity,
    });
  }

  async find(optinalwherQuery?: any, optionalIncludeEntity?: any): Promise<T[]> {
    return await this.entityManager.find(this.modelClass, {
      ...optinalwherQuery,
      ...optionalIncludeEntity,
    });
  }

  async update(id: any, updatedData: Partial<T>): Promise<T> {
    return await this.entityManager.save(this.modelClass, updatedData);
  }

  async delete(entity: any): Promise<void> {
    await this.entityManager.delete(this.modelClass, entity.id);
  }
}
