import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base-supabase.repository';
import { ISearchedPensionRepository } from '../../../domain/repositories/searched-pension-repository.interface';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';

@Injectable()
export class SearchedPensionSupabaseRepository
  extends BaseSupabaseRepository<PensionPotModel>
  implements ISearchedPensionRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase, 'searched_pensions');
  }

  private toModel(data: any): PensionPotModel {
    return {
      isWorkplacePension: data.pension_pots.isworkplacepension,
      monthlyPayment: data.pension_pots.monthlypayment,
      id: data.id,
      potName: data.pension_pots.potname,
      annualInterestRate: data.pension_pots.annualinterestrate,
      defaultAnnualInterestRate: data.pension_pots.defaultannualinterestrate,
      pensionProvider: data.pension_pots.pensionprovider,
      amount: data.pension_pots.amount,
      employer: data.pension_pots.employer,
      lastUpdatedAt: data.pension_pots.lastupdatedat,
      searchedPension: {
        id: data.id,
        pension_pot_id: data.pension_pot_id,
        lastUpdatedAt: data.lastupdatedat,
        policyNumber: data.policynumber,
        annualFee: data.annualfee,
        status: data.status,
        previousName: data.previousname,
        previousAddress: data.previousaddress,
        foundOn: data.foundon,
        isDraft: data.isdraft,
      },
    };
  }

  async findSearchPension(): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `*, pension_pots(id, potname, annualinterestrate, defaultannualinterestrate, amount, employer, pensionprovider, lastupdatedat)`,
      );

    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByStatus(status: string): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `*, pension_pots(id, potname, annualinterestrate, defaultannualinterestrate, amount, employer, pensionprovider, lastupdatedat)`,
      )
      .eq('status', status);
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByName(name: string): Promise<PensionPotModel | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `*, pension_pots(id, potname, annualinterestrate, defaultannualinterestrate, amount, employer, pensionprovider, lastupdatedat)`,
      )
      .eq('pension_pots.potname', name)
      .single();
    if (error) throw new Error(error.message);
    return this.toModel(data) as PensionPotModel | null;
  }

  async findByAmountOver(amount: number): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `*, pension_pots(id, potname, annualinterestrate, defaultannualinterestrate, amount, employer, pensionprovider, lastupdatedat)`,
      )
      .gt('pension_pots.amount', amount);
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByAmountUnder(amount: number): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `*, pension_pots(id, potname, annualinterestrate, defaultannualinterestrate, amount, employer, pensionprovider, lastupdatedat)`,
      )
      .lt('pension_pots.amount', amount);
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByEmployer(employer: string): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `*, pension_pots(id, potname, annualinterestrate, defaultannualinterestrate, amount, employer, pensionprovider, lastupdatedat)`,
      )
      .eq('pension_pots.employer', employer);

    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByProvider(provider: string): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `*, pension_pots(id, potname, annualinterestrate, defaultannualinterestrate, amount, employer, pensionprovider, lastupdatedat)`,
      )
      .eq('pension_pots.pensionprovider->>value', provider);

    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }
}
