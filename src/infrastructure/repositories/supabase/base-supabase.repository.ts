import { SupabaseClient } from '@supabase/supabase-js';
import { IBaseRepository } from '../../../domain/repositories/base-repository.interface';

export abstract class BaseSupabaseRepository<T> implements IBaseRepository<T> {
  constructor(
    protected supabase: SupabaseClient,
    protected tableName: string,
  ) {}

  async findAll(): Promise<T[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');
    if (error) throw new Error(error.message);
    return data as T[];
  }

  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .limit(1);
    if (error) throw new Error(error.message);

    if (!error) {
      return data[0] as T;
    }
    return null;
  }

  async create(item: T): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert([item])
      .single();
    if (error) throw new Error(error.message);
    return data as T;
  }

  async update(id: string, updatedItem: T): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(updatedItem)
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data as T;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return;
  }
}
