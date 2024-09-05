import { Controller, Get, Inject } from '@nestjs/common';
import { SEARCH_PENSION_USECASE_PROXY } from '../usecase-proxy/proxy/search-pension/search-pension.usecase.proxy';
import { UseCaseProxy } from '../usecase-proxy/usecase-proxy';
import { FilterSearchPensionByStatusUsecase } from '../../usecases/search-pension/filter-search-pension-by-status.usecase';
import { GetSearchedPensionPotsUseCase } from '../../usecases/search-pension/get-searched-pension-pots.usecase';
import { HttpResponse } from '../common/helpers/response.helper';

@Controller('pension-pots/search')
export class SearchPensionController {
  constructor(
    @Inject(SEARCH_PENSION_USECASE_PROXY.GET_SEARCH_PENSION_USECASE_PROXY)
    private readonly getSearchPensionUseCaseProxy: UseCaseProxy<GetSearchedPensionPotsUseCase>,
    @Inject(SEARCH_PENSION_USECASE_PROXY.FILTER_SEARCH_PENSION_USECASE_PROXY)
    private readonly filterSearchPensionUseCaseProxy: UseCaseProxy<FilterSearchPensionByStatusUsecase>,
  ) {}

  @Get('')
  async getSearchPension() {
    const response = await this.getSearchPensionUseCaseProxy
      .getInstance()
      .getSearchedPensionPots();
    return HttpResponse.send(
      'Searched pension pots retrieved successfully',
      response,
    );
  }

  @Get('status')
  async filterSearchPension() {
    const response = await this.filterSearchPensionUseCaseProxy
      .getInstance()
      .filterPensionPotByStatus();
    return HttpResponse.send(
      'Searched pension pots filtered successfully',
      response,
    );
  }
}
