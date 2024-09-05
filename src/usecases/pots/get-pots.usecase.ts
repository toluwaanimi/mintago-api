import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { BadRequestException } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';

export class GetPotsUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Get all pension pots and searched pensions
   */
  async getPots(): Promise<IUseCaseResponse<PensionPotModel[]>> {
    try {
      const pensionPots = await this.pensionPotRepository.findAll();

      return {
        data: [...pensionPots],
      };
    } catch (e) {
      this.logger.error(GetPotsUseCase.name, 'getPots', e.message);
      throw new BadRequestException('Cannot retrieve pots at the moment');
    }
  }
}
