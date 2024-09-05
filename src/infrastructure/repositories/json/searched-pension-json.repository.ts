import { Injectable } from '@nestjs/common';
import * as testData from '../../common/data/pots-records';
import { BaseJsonRepository } from './base-json.repository';
import { ISearchedPensionRepository } from '../../../domain/repositories/searched-pension-repository.interface';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { linkSearchedPensions } from '../../common/data/pots-records';

@Injectable()
export class SearchedPensionJsonRepository
  extends BaseJsonRepository<PensionPotModel>
  implements ISearchedPensionRepository
{
  constructor() {
    super(
      linkSearchedPensions(
        testData.defaultPots.pensionPots,
        testData.defaultPots.searchedPensions,
      ),
    );
  }

  findSearchPension(): Promise<PensionPotModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.searchedPension));
  }

  findByEmployer(employer: string): Promise<PensionPotModel[]> {
    return Promise.resolve(
      this.items.filter((pot) => pot.employer === employer),
    );
  }

  findByProvider(provider: string): Promise<PensionPotModel[]> {
    return Promise.resolve(
      this.items.filter((pot) => pot.pensionProvider?.value === provider),
    );
  }

  findByStatus(status: string): Promise<PensionPotModel[]> {
    return Promise.resolve(
      this.items.filter((pot) => pot?.searchedPension?.status === status),
    );
  }

  findByName(name: string): Promise<PensionPotModel | null> {
    const pot = this.items.find((pot) => pot.potName === name);
    return Promise.resolve(pot || null);
  }

  findByAmountOver(amount: number): Promise<PensionPotModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.amount > amount));
  }

  findByAmountUnder(amount: number): Promise<PensionPotModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.amount < amount));
  }
}
