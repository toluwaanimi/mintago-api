import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { NotFoundException } from '@nestjs/common';

export class FindPotByNameUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly searchedPensionRepository: ISearchedPensionRepository,
    private readonly logger: ILogger,
  ) {}

  async findPotByName(name: string): Promise<IUseCaseResponse> {
    try {
      const pot = await this.findPensionPotByName(name);
      if (!pot) {
        throw new NotFoundException('Cannot find pot with the given name');
      }
      return {
        data: pot,
      };
    } catch (e) {
      this.logger.error(FindPotByNameUseCase.name, 'findPotByName', e.message);
      throw new NotFoundException('Cannot find pot with the given name');
    }
  }

  private async findPensionPotByName(name: string) {
    const [pensionPot, searchedPension] = await Promise.all([
      this.pensionPotRepository.findByName(name),
      this.searchedPensionRepository.findByName(name),
    ]);

    return pensionPot || searchedPension;
  }
}
