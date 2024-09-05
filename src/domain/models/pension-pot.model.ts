import { BaseModel } from './base.model';
import { SearchedPensionModel } from './searched-pension.model';

export class PensionProvider {
  name: string | null;
  value: string | null;
}
export class PensionPotModel extends BaseModel {
  id: string;
  potName: string;
  annualInterestRate: number | null;
  defaultAnnualInterestRate: number;
  pensionProvider: PensionProvider | null;
  amount: number;
  employer: string | null;
  lastUpdatedAt: string;
  monthlyPayment: number;
  isWorkplacePension: boolean;
  searchedPension?: SearchedPensionModel;
}
