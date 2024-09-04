import { Injectable } from '@nestjs/common';
import * as testData from '../../common/data/pots-records';
import { BaseJsonRepository } from './base-json.repository';
import { ISearchedPensionRepository } from '../../../domain/repositories/searched-pension-repository.interface';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';

@Injectable()
export class SearchedPensionJsonRepository
  extends BaseJsonRepository<SearchedPensionModel>
  implements ISearchedPensionRepository
{
  constructor() {
    super(testData.defaultPots.searchedPensions);
  }

  findByEmployer(employer: string): Promise<SearchedPensionModel[]> {
    return Promise.resolve(
      this.items.filter((pot) => pot.employer === employer),
    );
  }

  findByProvider(provider: string): Promise<SearchedPensionModel[]> {
    return Promise.resolve(
      this.items.filter((pot) => pot.pensionProvider?.value === provider),
    );
  }

  findByStatus(status: string): Promise<SearchedPensionModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.status === status));
  }

  findByName(name: string): Promise<SearchedPensionModel | null> {
    const pot = this.items.find((pot) => pot.potName === name);
    return Promise.resolve(pot || null);
  }

  findByAmountOver(amount: number): Promise<SearchedPensionModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.amount > amount));
  }

  findByAmountUnder(amount: number): Promise<SearchedPensionModel[]> {
    return Promise.resolve(this.items.filter((pot) => pot.amount < amount));
  }
}
