import { BaseModel } from './base.model';

export class PensionProvider {
  name: string | null;
  value: string | null;
}

export class PensionPotModel extends BaseModel {
  potName: string;
  annualInterestRate: number | null;
  defaultAnnualInterestRate: number;
  pensionProvider: PensionProvider | null;
  amount: number;
  employer: string | null;
  lastUpdatedAt: string;
  monthlyPayment: number;
  isWorkplacePension: boolean;
}
