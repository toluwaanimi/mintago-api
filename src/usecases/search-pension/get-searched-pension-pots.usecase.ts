import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class GetSearchedPensionPotsUseCase {
  constructor(
    private readonly searchedPensionRepository: ISearchedPensionRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Get all searched pension pots
   */
  async getSearchedPensionPots() {
    const pots = await this.searchedPensionRepository.findAll();
    return {
      data: pots,
    };
  }
}
