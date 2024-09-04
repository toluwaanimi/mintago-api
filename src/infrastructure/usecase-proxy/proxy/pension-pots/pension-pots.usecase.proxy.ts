import { GetPensionPotsUseCase } from '../../../../usecases/pension-pots/get-pension-pots.usecase';
import { LoggerService } from '../../../logger/logger.service';
import { UseCaseProxy } from '../../usecase-proxy';
import { PensionPotSupabaseRepository } from '../../../repositories/supabase/pension-pot-supabase.repository';
import { PensionPotJsonRepository } from '../../../repositories/json/pension-pot-json.repository';

export const PENSION_POTS_USECASE_PROXY = {
  GET_PENSION_POTS_USECASE_PROXY: 'GET_PENSION_POTS_USECASE_PROXY',
};

export const GET_PENSION_POTS_USECASE_PROXY = {
  inject: ['PensionPotRepository', LoggerService],
  provide: PENSION_POTS_USECASE_PROXY.GET_PENSION_POTS_USECASE_PROXY,
  useFactory: (
    pensionPotRepository:
      | PensionPotSupabaseRepository
      | PensionPotJsonRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new GetPensionPotsUseCase(pensionPotRepository, loggerService),
    ),
};
