import { PensionPotModel, PensionProvider } from './pension-pot.model';
import { BaseModel } from './base.model';

type SearchedPensionBase = Omit<
  PensionPotModel,
  'isWorkplacePension' | 'monthlyPayment'
>;

export class SearchedPensionModel
  extends BaseModel
  implements SearchedPensionBase
{
  potName: string;
  annualInterestRate: number | null;
  defaultAnnualInterestRate: number;
  pensionProvider: PensionProvider | null;
  amount: number;
  employer: string | null;
  lastUpdatedAt: string;
  policyNumber: string | null;
  annualFee: number | null;
  status: string;
  previousName: string | null;
  previousAddress: string;
  foundOn: string | null;
  isDraft: boolean;
}
