import { FilterSearchPensionByStatusUsecase } from '../../../../usecases/search-pension/filter-search-pension-by-status.usecase';
import { UseCaseProxy } from '../../usecase-proxy';
import { LoggerService } from '../../../logger/logger.service';
import { SearchedPensionSupabaseRepository } from '../../../repositories/supabase/searched-pension-supabase.repository';
import { SearchedPensionJsonRepository } from '../../../repositories/json/searched-pension-json.repository';
import { GetSearchedPensionPotsUseCase } from '../../../../usecases/search-pension/get-searched-pension-pots.usecase';

export const SEARCH_PENSION_USECASE_PROXY = {
  FILTER_SEARCH_PENSION_USECASE_PROXY: 'FILTER_SEARCH_PENSION_USECASE_PROXY',
  GET_SEARCH_PENSION_USECASE_PROXY: 'GET_SEARCH_PENSION_USECASE_PROXY',
};

export const FILTER_SEARCH_PENSION_USECASE_PROXY = {
  inject: [LoggerService, 'SearchedPensionRepository'],
  provide: SEARCH_PENSION_USECASE_PROXY.FILTER_SEARCH_PENSION_USECASE_PROXY,
  useFactory: (
    loggerService: LoggerService,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
  ) =>
    new UseCaseProxy(
      new FilterSearchPensionByStatusUsecase(
        searchedPensionRepository,
        loggerService,
      ),
    ),
};

export const GET_SEARCH_PENSION_USECASE_PROXY = {
  inject: [LoggerService, 'SearchedPensionRepository'],
  provide: SEARCH_PENSION_USECASE_PROXY.GET_SEARCH_PENSION_USECASE_PROXY,
  useFactory: (
    loggerService: LoggerService,
    searchedPensionRepository:
      | SearchedPensionSupabaseRepository
      | SearchedPensionJsonRepository,
  ) =>
    new UseCaseProxy(
      new GetSearchedPensionPotsUseCase(
        searchedPensionRepository,
        loggerService,
      ),
    ),
};
