import { BaseModel } from './base.model';

export class SearchedPensionModel extends BaseModel {
  pension_pot_id: string;
  policyNumber: string | null;
  annualFee: number | null;
  status: string;
  previousName: string | null;
  previousAddress: string;
  foundOn: string | null;
  lastUpdatedAt: string;
  isDraft: boolean;
}
