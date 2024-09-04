import { IBaseRepository } from './base-repository.interface';
import { PensionPotModel } from '../models/pension-pot.model';

export interface IPensionPotRepository
  extends IBaseRepository<PensionPotModel> {
  findByEmployer(employer: string): Promise<PensionPotModel[]>;
  findByProvider(provider: string): Promise<PensionPotModel[]>;
  findByAmountOver(amount: number): Promise<PensionPotModel[]>;
  findByAmountUnder(amount: number): Promise<PensionPotModel[]>;
  findByName(name: string): Promise<PensionPotModel | null>;
}
