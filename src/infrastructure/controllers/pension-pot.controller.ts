import { Controller, Get, Inject } from '@nestjs/common';
import { PENSION_POTS_USECASE_PROXY } from '../usecase-proxy/proxy/pension-pots/pension-pots.usecase.proxy';
import { UseCaseProxy } from '../usecase-proxy/usecase-proxy';
import { GetPensionPotsUseCase } from '../../usecases/pension-pots/get-pension-pots.usecase';
import { HttpResponse } from '../common/helpers/response.helper';

@Controller('pensions')
export class PensionPotController {
  constructor(
    @Inject(PENSION_POTS_USECASE_PROXY.GET_PENSION_POTS_USECASE_PROXY)
    private readonly getPensionPotsUseCaseProxy: UseCaseProxy<GetPensionPotsUseCase>,
  ) {}

  @Get('')
  async getPensionPots() {
    const response = await this.getPensionPotsUseCaseProxy
      .getInstance()
      .getPensionPots();
    return HttpResponse.send('Pension pots retrieved successfully', response);
  }
}
