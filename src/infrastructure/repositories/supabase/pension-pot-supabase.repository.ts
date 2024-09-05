import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base-supabase.repository';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { IPensionPotRepository } from '../../../domain/repositories/pension-pot-repository.interface';

@Injectable()
export class PensionPotSupabaseRepository
  extends BaseSupabaseRepository<PensionPotModel>
  implements IPensionPotRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase, 'pension_pots');
  }

  private toModel(data: any): PensionPotModel {
    return {
      defaultAnnualInterestRate: data.defaultannualinterestrate,
      isWorkplacePension: data.isworkplacepension,
      lastUpdatedAt: data.lastupdatedat,
      id: data.id,
      potName: data.potname,
      amount: data.amount,
      employer: data.employer,
      pensionProvider: data.pensionprovider,
      annualInterestRate: data.annualinterestrate,
      monthlyPayment: data.monthlypayment,
    };
  }

  async findAll(): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByEmployer(employer: string): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('employer', employer);
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByProvider(provider: string): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('pensionprovider->>value', provider);
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByAmountOver(amount: number): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gt('amount', amount);
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByAmountUnder(amount: number): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .lt('amount', amount);
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }

  async findByName(name: string): Promise<PensionPotModel | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('potname', name)
      .single();
    if (error) throw new Error(error.message);
    return this.toModel(data) as PensionPotModel | null;
  }

  async findPensionPots(): Promise<PensionPotModel[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');
    if (error) throw new Error(error.message);
    return data.map((item: any) => this.toModel(item)) as PensionPotModel[];
  }
}
