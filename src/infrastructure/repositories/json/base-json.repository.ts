import { IBaseRepository } from '../../../domain/repositories/base-repository.interface';

export abstract class BaseJsonRepository<T> implements IBaseRepository<T> {
  constructor(protected items: T[]) {}

  findAll(): Promise<T[]> {
    return Promise.resolve(this.items);
  }

  findById(id: string): Promise<T | null> {
    const item = this.items.find((item: any) => item.id === id);
    return Promise.resolve(item || null);
  }

  create(item: T): Promise<T> {
    this.items.push(item);
    return Promise.resolve(item);
  }

  update(id: string, updatedItem: T): Promise<T> {
    const index = this.items.findIndex((item: any) => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    this.items[index] = updatedItem;
    return Promise.resolve(updatedItem);
  }

  delete(id: string): Promise<void> {
    this.items = this.items.filter((item: any) => item.id !== id);
    return Promise.resolve();
  }

  findWhere(field: string, value: string): Promise<T[]> {
    const items = this.items.filter((item: any) => item[field] === value);
    return Promise.resolve(items);
  }

  findByWhere(field: string, value: string): Promise<T | null> {
    const item = this.items.find((item: any) => item[field] === value);
    return Promise.resolve(item || null);
  }
}
