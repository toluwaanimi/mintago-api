import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { POT_USECASE_PROXY } from '../usecase-proxy/proxy/pots/pot.usecase.proxy';
import { UseCaseProxy } from '../usecase-proxy/usecase-proxy';
import { CalculatePensionPotsForecastedBalanceUseCase } from '../../usecases/pots/calculate-pension-pots-forecasted-balance.usecase';
import { FilterPotByAmountUseCase } from '../../usecases/pots/filter-pot-by-amount.usecase';
import { FilterPotsByEmployerUseCase } from '../../usecases/pots/filter-pots-by-employer.usecase';
import { FilterPotsByPensionProviderUseCase } from '../../usecases/pots/filter-pots-by-pension-provider.usecase';
import { FindPotByIdUseCase } from '../../usecases/pots/find-pot-by-id.usecase';
import { FindPotByNameUseCase } from '../../usecases/pots/find-pot-by-name.usecase';
import { GetPotsUseCase } from '../../usecases/pots/get-pots.usecase';
import {
  CalculatePensionPotBalanceDto,
  GetPotsDto,
} from '../common/dto/pot.dto';
import { HttpResponse } from '../common/helpers/response.helper';

@Controller('pots')
export class PotController {
  constructor(
    @Inject(POT_USECASE_PROXY.CALCULATE_PENSION_POT_BALANCE_USECASE_PROXY)
    private readonly calculatePensionPotBalanceUseCaseProxy: UseCaseProxy<CalculatePensionPotsForecastedBalanceUseCase>,
    @Inject(POT_USECASE_PROXY.FILTER_POT_BY_AMOUNT_USECASE_PROXY)
    private readonly filterPotByAmountUseCaseProxy: UseCaseProxy<FilterPotByAmountUseCase>,
    @Inject(POT_USECASE_PROXY.FILTER_POT_BY_EMPLOYER_USECASE_PROXY)
    private readonly filterPotByEmployerUseCaseProxy: UseCaseProxy<FilterPotsByEmployerUseCase>,
    @Inject(POT_USECASE_PROXY.FILTER_POT_BY_ID_USECASE_PROXY)
    private readonly filterPotByIdUseCaseProxy: UseCaseProxy<FindPotByIdUseCase>,
    @Inject(POT_USECASE_PROXY.FILTER_POT_BY_NAME_USECASE_PROXY)
    private readonly filterPotByNameUseCaseProxy: UseCaseProxy<FindPotByNameUseCase>,
    @Inject(POT_USECASE_PROXY.FILTER_POT_BY_PENSION_PROVIDER_USECASE_PROXY)
    private readonly filterPotByPensionProviderUseCaseProxy: UseCaseProxy<FilterPotsByPensionProviderUseCase>,
    @Inject(POT_USECASE_PROXY.GET_POT_USECASE_PROXY)
    private readonly getPotUseCaseProxy: UseCaseProxy<GetPotsUseCase>,
  ) {}

  @Post('balance')
  async calculatePensionPotBalance(
    @Body() body: CalculatePensionPotBalanceDto,
  ) {
    const response = await this.calculatePensionPotBalanceUseCaseProxy
      .getInstance()
      .getPensionPotsForecastedBalance(body.year);
    return HttpResponse.send('Pension pot balance calculated', response);
  }

  @Get(':id')
  async getPotById(@Param('id') id: string) {
    const response = await this.filterPotByIdUseCaseProxy
      .getInstance()
      .findPotById(id);
    return HttpResponse.send('Pension pot retrieved', response);
  }

  @Get('')
  async getPots(@Query() query: GetPotsDto) {
    let response;
    let message = 'Pension pots retrieved';

    if (query.name) {
      response = await this.filterPotByNameUseCaseProxy
        .getInstance()
        .findPotByName(query.name);
      message = `Pension pot retrieved by Name: ${query.name}`;
      return HttpResponse.send(message, response);
    }

    if (query.employer) {
      response = await this.filterPotByEmployerUseCaseProxy
        .getInstance()
        .filterPotsByEmployer(query.employer);
      message = `Pension pots retrieved by Employer: ${query.employer}`;
      return HttpResponse.send(message, response);
    }

    if (query.provider) {
      response = await this.filterPotByPensionProviderUseCaseProxy
        .getInstance()
        .filterPotsByPensionProvider(query.provider);
      message = `Pension pots retrieved by Provider: ${query.provider}`;
      return HttpResponse.send(message, response);
    }

    if (query.amount !== undefined && query.direction) {
      response = await this.filterPotByAmountUseCaseProxy
        .getInstance()
        .filterPotByAmount(query.amount, query.direction);
      message = `Pension pots retrieved by Amount: ${query.direction} than ${query.amount}`;
      return HttpResponse.send(message, response);
    }
    response = await this.getPotUseCaseProxy.getInstance().getPots();
    return HttpResponse.send('Pension pots retrieved', response);
  }
}
