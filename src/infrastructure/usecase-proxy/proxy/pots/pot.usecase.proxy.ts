import { UseCaseProxy } from '../../usecase-proxy';
import { CalculatePensionPotsForecastedBalanceUseCase } from '../../../../usecases/pots/calculate-pension-pots-forecasted-balance.usecase';
import { LoggerService } from '../../../logger/logger.service';
import { FilterPotByAmountUseCase } from '../../../../usecases/pots/filter-pot-by-amount.usecase';
import { FilterPotsByEmployerUseCase } from '../../../../usecases/pots/filter-pots-by-employer.usecase';
import { FilterPotsByPensionProviderUseCase } from '../../../../usecases/pots/filter-pots-by-pension-provider.usecase';
import { FindPotByIdUseCase } from '../../../../usecases/pots/find-pot-by-id.usecase';
import { FindPotByNameUseCase } from '../../../../usecases/pots/find-pot-by-name.usecase';
import { GetPotsUseCase } from '../../../../usecases/pots/get-pots.usecase';
import { PensionPotSupabaseRepository } from '../../../repositories/supabase/pension-pot-supabase.repository';
import { PensionPotJsonRepository } from '../../../repositories/json/pension-pot-json.repository';
import { SearchedPensionSupabaseRepository } from '../../../repositories/supabase/searched-pension-supabase.repository';
import { SearchedPensionJsonRepository } from '../../../repositories/json/searched-pension-json.repository';

export const POT_USECASE_PROXY = {
  CALCULATE_PENSION_POT_BALANCE_USECASE_PROXY:
    'CALCULATE_PENSION_POT_BALANCE_USECASE_PROXY',
  FILTER_POT_BY_AMOUNT_USECASE_PROXY: 'FILTER_POT_BY_AMOUNT_USECASE_PROXY',
  FILTER_POT_BY_EMPLOYER_USECASE_PROXY: 'FILTER_POT_BY_EMPLOYER_USECASE_PROXY',
  FILTER_POT_BY_PENSION_PROVIDER_USECASE_PROXY:
    'FILTER_POT_BY_PENSION_PROVIDER_USECASE_PROXY',
  FILTER_POT_BY_ID_USECASE_PROXY: 'FILTER_POT_BY_ID_USECASE_PROXY',
  FILTER_POT_BY_NAME_USECASE_PROXY: 'FILTER_POT_BY_NAME_USECASE_PROXY',
  GET_POT_USECASE_PROXY: 'GET_POT_USECASE_PROXY',
};

export const CALCULATE_PENSION_POT_BALANCE_USECASE_PROXY = {
  inject: ['PensionPotRepository', LoggerService],
  provide: POT_USECASE_PROXY.CALCULATE_PENSION_POT_BALANCE_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new CalculatePensionPotsForecastedBalanceUseCase(
        pensionPotRepository,
        loggerService,
      ),
    ),
};

export const FILTER_POT_BY_AMOUNT_USECASE_PROXY = {
  inject: ['PensionPotRepository', 'SearchedPensionRepository', LoggerService],
  provide: POT_USECASE_PROXY.FILTER_POT_BY_AMOUNT_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new FilterPotByAmountUseCase(
        pensionPotRepository,
        searchedPensionRepository,
        loggerService,
      ),
    ),
};

export const FILTER_POT_BY_EMPLOYER_USECASE_PROXY = {
  inject: ['PensionPotRepository', 'SearchedPensionRepository', LoggerService],
  provide: POT_USECASE_PROXY.FILTER_POT_BY_EMPLOYER_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new FilterPotsByEmployerUseCase(
        pensionPotRepository,
        searchedPensionRepository,
        loggerService,
      ),
    ),
};

export const FILTER_POT_BY_PENSION_PROVIDER_USECASE_PROXY = {
  inject: ['PensionPotRepository', 'SearchedPensionRepository', LoggerService],
  provide: POT_USECASE_PROXY.FILTER_POT_BY_PENSION_PROVIDER_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new FilterPotsByPensionProviderUseCase(
        pensionPotRepository,
        searchedPensionRepository,
        loggerService,
      ),
    ),
};

export const FILTER_POT_BY_ID_USECASE_PROXY = {
  inject: ['PensionPotRepository', 'SearchedPensionRepository', LoggerService],
  provide: POT_USECASE_PROXY.FILTER_POT_BY_ID_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new FindPotByIdUseCase(
        pensionPotRepository,
        searchedPensionRepository,
        loggerService,
      ),
    ),
};

export const FILTER_POT_BY_NAME_USECASE_PROXY = {
  inject: ['PensionPotRepository', 'SearchedPensionRepository', LoggerService],
  provide: POT_USECASE_PROXY.FILTER_POT_BY_NAME_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new FindPotByNameUseCase(
        pensionPotRepository,
        searchedPensionRepository,
        loggerService,
      ),
    ),
};

export const GET_POT_USECASE_PROXY = {
  inject: ['PensionPotRepository', 'SearchedPensionRepository', LoggerService],
  provide: POT_USECASE_PROXY.GET_POT_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new GetPotsUseCase(
        pensionPotRepository,
        searchedPensionRepository,
        loggerService,
      ),
    ),
};
