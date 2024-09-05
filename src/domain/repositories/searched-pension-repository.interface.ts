import { IBaseRepository } from './base-repository.interface';
import { PensionPotModel } from '../models/pension-pot.model';

export interface ISearchedPensionRepository
  extends IBaseRepository<PensionPotModel> {
  findSearchPension(): Promise<PensionPotModel[]>;
  findByEmployer(employer: string): Promise<PensionPotModel[]>;
  findByProvider(provider: string): Promise<PensionPotModel[]>;
  findByStatus(status: string): Promise<PensionPotModel[]>;
  findByName(name: string): Promise<PensionPotModel | null>;
  findByAmountOver(amount: number): Promise<PensionPotModel[]>;
  findByAmountUnder(amount: number): Promise<PensionPotModel[]>;
}
