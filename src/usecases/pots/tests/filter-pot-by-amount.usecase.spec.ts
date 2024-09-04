import { BadRequestException } from '@nestjs/common';
import { FilterPotByAmountUseCase } from '../filter-pot-by-amount.usecase';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import {
  mockPensionPotRepository,
  mockSearchedPensionRepository,
} from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';

describe('FilterPotByAmountUseCase', () => {
  let filterPotByAmountUseCase: FilterPotByAmountUseCase;

  beforeEach(() => {
    filterPotByAmountUseCase = new FilterPotByAmountUseCase(
      mockPensionPotRepository,
      mockSearchedPensionRepository,
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

    const mockSearchedPensions: SearchedPensionModel[] = [
      {
        id: '2',
        potName: 'Searched Pot 1',
        amount: 20000,
        annualInterestRate: 3,
        defaultAnnualInterestRate: 3,
        employer: 'Employer 2',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        pensionProvider: { name: 'Provider 2', value: 'PROVIDER_2' },
        status: 'FOUND',
        foundOn: '2024-01-01T00:00:00.000Z',
        isDraft: false,
        previousName: null,
        previousAddress: 'Some Address',
        policyNumber: '',
        annualFee: 0,
      },
    ];

    mockPensionPotRepository.findByAmountOver.mockResolvedValue(
      mockPensionPots,
    );
    mockSearchedPensionRepository.findByAmountOver.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await filterPotByAmountUseCase.filterPotByAmount(
      10000,
      'greater',
    );

    expect(mockPensionPotRepository.findByAmountOver).toHaveBeenCalledWith(
      10000,
    );
    expect(mockSearchedPensionRepository.findByAmountOver).toHaveBeenCalledWith(
      10000,
    );
    expect(result.data).toEqual([...mockPensionPots, ...mockSearchedPensions]);
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

    const mockSearchedPensions: SearchedPensionModel[] = [
      {
        id: '2',
        potName: 'Searched Pot 1',
        amount: 3000,
        annualInterestRate: 3,
        defaultAnnualInterestRate: 3,
        employer: 'Employer 2',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        pensionProvider: { name: 'Provider 2', value: 'PROVIDER_2' },
        status: 'FOUND',
        foundOn: '2024-01-01T00:00:00.000Z',
        isDraft: false,
        previousName: null,
        previousAddress: 'Some Address',
        policyNumber: '',
        annualFee: 0,
      },
    ];

    mockPensionPotRepository.findByAmountUnder.mockResolvedValue(
      mockPensionPots,
    );
    mockSearchedPensionRepository.findByAmountUnder.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await filterPotByAmountUseCase.filterPotByAmount(
      10000,
      'less',
    );

    expect(mockPensionPotRepository.findByAmountUnder).toHaveBeenCalledWith(
      10000,
    );
    expect(
      mockSearchedPensionRepository.findByAmountUnder,
    ).toHaveBeenCalledWith(10000);
    expect(result.data).toEqual([...mockPensionPots, ...mockSearchedPensions]);
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
