export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;

  findById(id: string): Promise<T | null>;

  findWhere?(field: string, value: string): Promise<T[]>;

  findByWhere?(field: string, value: string): Promise<T | null>;

  create(item: T): Promise<T>;

  update(id: string, item: T): Promise<T>;

  delete(id: string): Promise<void>;
}
