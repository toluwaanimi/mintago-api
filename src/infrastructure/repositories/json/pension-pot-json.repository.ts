import { Injectable } from '@nestjs/common';
import { BaseJsonRepository } from './base-json.repository';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { IPensionPotRepository } from '../../../domain/repositories/pension-pot-repository.interface';
import * as testData from '../../common/data/pots-records';

@Injectable()
export class PensionPotJsonRepository
  extends BaseJsonRepository<PensionPotModel>
  implements IPensionPotRepository
{
  constructor() {
    super(testData.defaultPots.pensionPots);
  }

  findByEmployer(employer: string): Promise<PensionPotModel[]> {
    return Promise.resolve(
      this.items.filter((pot) => pot.employer === employer),
    );
  }

  findByProvider(provider: string): Promise<PensionPotModel[]> {
    return Promise.resolve(
      this.items.filter(
        (pot) =>
          pot.pensionProvider?.value === provider ||
          pot.pensionProvider?.name === provider,
      ),
    );
  }

  findByAmountOver(amount: number): Promise<PensionPotModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.amount > amount));
  }

  findByAmountUnder(amount: number): Promise<PensionPotModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.amount < amount));
  }

  findByName(name: string): Promise<PensionPotModel | null> {
    const pot = this.items.find((pot) => pot.potName === name);
    return Promise.resolve(pot || null);
  }
}
