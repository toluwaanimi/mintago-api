import { SearchedPensionModel } from '../models/searched-pension.model';
import { IBaseRepository } from './base-repository.interface';

export interface ISearchedPensionRepository
  extends IBaseRepository<SearchedPensionModel> {
  findByEmployer(employer: string): Promise<SearchedPensionModel[]>;
  findByProvider(provider: string): Promise<SearchedPensionModel[]>;
  findByStatus(status: string): Promise<SearchedPensionModel[]>;
  findByName(name: string): Promise<SearchedPensionModel | null>;
  findByAmountOver(amount: number): Promise<SearchedPensionModel[]>;
  findByAmountUnder(amount: number): Promise<SearchedPensionModel[]>;
}
