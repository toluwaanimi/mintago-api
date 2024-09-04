import { Controller, Get, Inject } from '@nestjs/common';
import { PENSION_POTS_USECASE_PROXY } from '../usecase-proxy/proxy/pension-pots/pension-pots.usecase.proxy';
import { UseCaseProxy } from '../usecase-proxy/usecase-proxy';
import { GetPensionPotsUseCase } from '../../usecases/pension-pots/get-pension-pots.usecase';

@Controller('pensions')
export class PensionPotController {
  constructor(
    @Inject(PENSION_POTS_USECASE_PROXY.GET_PENSION_POTS_USECASE_PROXY)
    private readonly getPensionPotsUseCaseProxy: UseCaseProxy<GetPensionPotsUseCase>,
  ) {}

  @Get('')
  async getPensionPots() {
    return await this.getPensionPotsUseCaseProxy.getInstance().getPensionPots();
  }
}
