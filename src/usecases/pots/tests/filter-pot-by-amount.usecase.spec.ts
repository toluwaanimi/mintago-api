import { BadRequestException } from '@nestjs/common';
import { FilterPotByAmountUseCase } from '../filter-pot-by-amount.usecase';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { mockPensionPotRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';

describe('FilterPotByAmountUseCase', () => {
  let filterPotByAmountUseCase: FilterPotByAmountUseCase;

  beforeEach(() => {
    filterPotByAmountUseCase = new FilterPotByAmountUseCase(
      mockPensionPotRepository,
      mockLogger,
    );
  });

  it('should return pots with amount greater than specified value', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: '1',
        potName: 'Pot 1',
        amount: 15000,
        monthlyPayment: 100,
        annualInterestRate: 5,
        defaultAnnualInterestRate: 5,
        employer: 'Employer 1',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
      },
    ];

    mockPensionPotRepository.findByAmountOver.mockResolvedValue(
      mockPensionPots,
    );

    const result = await filterPotByAmountUseCase.filterPotByAmount(
      10000,
      'greater',
    );

    expect(mockPensionPotRepository.findByAmountOver).toHaveBeenCalledWith(
      10000,
    );
    expect(result.data).toEqual([...mockPensionPots]);
  });

  it('should return pots with amount less than specified value', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: '1',
        potName: 'Pot 1',
        amount: 5000,
        monthlyPayment: 100,
        annualInterestRate: 5,
        defaultAnnualInterestRate: 5,
        employer: 'Employer 1',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
      },
    ];

    mockPensionPotRepository.findByAmountUnder.mockResolvedValue(
      mockPensionPots,
    );

    const result = await filterPotByAmountUseCase.filterPotByAmount(
      10000,
      'less',
    );

    expect(mockPensionPotRepository.findByAmountUnder).toHaveBeenCalledWith(
      10000,
    );

    expect(result.data).toEqual([...mockPensionPots]);
  });

  it('should throw BadRequestException if an error occurs', async () => {
    mockPensionPotRepository.findByAmountOver.mockRejectedValue(
      new Error('Database error'),
    );

    await expect(
      filterPotByAmountUseCase.filterPotByAmount(10000, 'greater'),
    ).rejects.toThrow(BadRequestException);

    expect(mockLogger.error).toHaveBeenCalledWith(
      'Error filtering pension pots by amount',
      expect.any(Error),
    );
  });
});
