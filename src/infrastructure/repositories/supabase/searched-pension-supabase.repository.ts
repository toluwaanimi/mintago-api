import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base-supabase.repository';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import { ISearchedPensionRepository } from '../../../domain/repositories/searched-pension-repository.interface';

@Injectable()
export class SearchedPensionSupabaseRepository
  extends BaseSupabaseRepository<SearchedPensionModel>
  implements ISearchedPensionRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase, 'searched_pensions');
  }

  private toModel(data: any): SearchedPensionModel {
    return {
      annualFee: data.annualfee,
      annualInterestRate: data.annualinterestrate,
      defaultAnnualInterestRate: data.defaultannualinterestrate,
      foundOn: data.foundon,
      isDraft: data.isdraft,
      lastUpdatedAt: data.lastupdatedat,
      policyNumber: data.policynumber,
      previousAddress: data.previousaddress,
      previousName: data.previousname,
      id: data.id,
      potName: data.potname,
      amount: data.amount,
      employer: data.employer,
      pensionProvider: data.pensionprovider,
      status: data.status,
    };
  }

  async findByEmployer(employer: string): Promise<SearchedPensionModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('employer', employer);
    if (error) throw new Error(error.message);
    return data.map((item: any) =>
      this.toModel(item),
    ) as SearchedPensionModel[];
  }

  async findByProvider(provider: string): Promise<SearchedPensionModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('pensionprovider->>value', provider);
    if (error) throw new Error(error.message);
    return data.map((item: any) =>
      this.toModel(item),
    ) as SearchedPensionModel[];
  }

  async findByStatus(status: string): Promise<SearchedPensionModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('status', status);
    if (error) throw new Error(error.message);
    return data.map((item: any) =>
      this.toModel(item),
    ) as SearchedPensionModel[];
  }

  async findByName(name: string): Promise<SearchedPensionModel | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('potname', name)
      .single();
    if (error) throw new Error(error.message);
    return this.toModel(data) as SearchedPensionModel | null;
  }

  async findByAmountOver(amount: number): Promise<SearchedPensionModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gt('amount', amount);
    if (error) throw new Error(error.message);
    return data.map((item: any) =>
      this.toModel(item),
    ) as SearchedPensionModel[];
  }

  async findByAmountUnder(amount: number): Promise<SearchedPensionModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .lt('amount', amount);
    if (error) throw new Error(error.message);
    return data.map((item: any) =>
      this.toModel(item),
    ) as SearchedPensionModel[];
  }
}
