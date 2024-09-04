import { FilterPotsByPensionProviderUseCase } from '../filter-pots-by-pension-provider.usecase';
import {
  mockPensionPotRepository,
  mockSearchedPensionRepository,
} from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import { BadRequestException } from '@nestjs/common';

describe('FilterPotsByPensionProviderUseCase', () => {
  let filterPotsByPensionProviderUseCase: FilterPotsByPensionProviderUseCase;

  beforeEach(() => {
    filterPotsByPensionProviderUseCase = new FilterPotsByPensionProviderUseCase(
      mockPensionPotRepository,
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return pots filtered by provider', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: '1',
        potName: 'Pot 1',
        amount: 10000,
        monthlyPayment: 100,
        annualInterestRate: 5,
        defaultAnnualInterestRate: 5,
        employer: 'Employer 1',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
      },
    ];

    const mockSearchedPensions: SearchedPensionModel[] = [
      {
        id: '2',
        potName: 'Searched Pot 1',
        amount: 5000,
        annualInterestRate: 3,
        defaultAnnualInterestRate: 3,
        employer: 'Employer 2',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
        status: 'FOUND',
        foundOn: '2024-01-01T00:00:00.000Z',
        isDraft: false,
        previousName: null,
        previousAddress: 'Some Address',
        policyNumber: '',
        annualFee: 0,
      },
    ];

    mockPensionPotRepository.findByProvider.mockResolvedValue(mockPensionPots);
    mockSearchedPensionRepository.findByProvider.mockResolvedValue(
      mockSearchedPensions,
    );

    const result =
      await filterPotsByPensionProviderUseCase.filterPotsByPensionProvider(
        'Provider 1',
      );

    expect(mockPensionPotRepository.findByProvider).toHaveBeenCalledWith(
      'Provider 1',
    );
    expect(mockSearchedPensionRepository.findByProvider).toHaveBeenCalledWith(
      'Provider 1',
    );
    expect(result.data).toEqual([...mockPensionPots, ...mockSearchedPensions]);
  });

  it('should return an empty array if no pots are found for the given provider', async () => {
    mockPensionPotRepository.findByProvider.mockResolvedValue([]);
    mockSearchedPensionRepository.findByProvider.mockResolvedValue([]);

    const result =
      await filterPotsByPensionProviderUseCase.filterPotsByPensionProvider(
        'Nonexistent Provider',
      );

    expect(mockPensionPotRepository.findByProvider).toHaveBeenCalledWith(
      'Nonexistent Provider',
    );
    expect(mockSearchedPensionRepository.findByProvider).toHaveBeenCalledWith(
      'Nonexistent Provider',
    );
    expect(result.data).toEqual([]);
  });

  it('should throw BadRequestException if an error occurs', async () => {
    mockPensionPotRepository.findByProvider.mockRejectedValue(
      new Error('Database error'),
    );

    await expect(
      filterPotsByPensionProviderUseCase.filterPotsByPensionProvider(
        'Provider 1',
      ),
    ).rejects.toThrow(BadRequestException);

    expect(mockLogger.error).toHaveBeenCalledWith(
      FilterPotsByPensionProviderUseCase.name,
      'filterPotsByPensionProvider',
      expect.any(String),
    );
  });
});
