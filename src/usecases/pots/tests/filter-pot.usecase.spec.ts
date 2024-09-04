import { NotFoundException, BadRequestException } from '@nestjs/common';
import { FilterPotUseCase } from '../filter-pot.usecase';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import {
  mockPensionPotRepository,
  mockSearchedPensionRepository,
} from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';

describe('FilterPotUseCase', () => {
  let filterPotUseCase: FilterPotUseCase;

  beforeEach(() => {
    filterPotUseCase = new FilterPotUseCase(
      mockPensionPotRepository,
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return pots filtered by name', async () => {
    const mockPensionPot: PensionPotModel = {
      id: 'pension-123',
      potName: 'Test Pot',
      annualInterestRate: 0.03,
      defaultAnnualInterestRate: 0.02,
      amount: 1000,
      employer: 'Test Employer',
      lastUpdatedAt: '2024-01-01T00:00:00.000Z',
      monthlyPayment: 100,
      isWorkplacePension: true,
      pensionProvider: { name: 'Provider', value: 'PROVIDER' },
    };

    mockPensionPotRepository.findByName.mockResolvedValue(mockPensionPot);
    mockSearchedPensionRepository.findByName.mockResolvedValue(null);

    const result = await filterPotUseCase.filterPots({ name: 'Test Pot' });

    expect(mockPensionPotRepository.findByName).toHaveBeenCalledWith(
      'Test Pot',
    );
    expect(result.data).toEqual([mockPensionPot]);
  });

  it('should return pots filtered by employer', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: 'pension-123',
        potName: 'Test Pot',
        annualInterestRate: 0.03,
        defaultAnnualInterestRate: 0.02,
        amount: 1000,
        employer: 'Test Employer',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        monthlyPayment: 100,
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider', value: 'PROVIDER' },
      },
    ];

    const mockSearchedPensions: SearchedPensionModel[] = [];

    mockPensionPotRepository.findByEmployer.mockResolvedValue(mockPensionPots);
    mockSearchedPensionRepository.findByEmployer.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await filterPotUseCase.filterPots({
      employer: 'Test Employer',
    });

    expect(mockPensionPotRepository.findByEmployer).toHaveBeenCalledWith(
      'Test Employer',
    );
    expect(result.data).toEqual([...mockPensionPots, ...mockSearchedPensions]);
  });

  it('should return pots filtered by amount (greater)', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: 'pension-123',
        potName: 'Test Pot',
        annualInterestRate: 0.03,
        defaultAnnualInterestRate: 0.02,
        amount: 2000,
        employer: 'Test Employer',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        monthlyPayment: 100,
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider', value: 'PROVIDER' },
      },
    ];

    const mockSearchedPensions: SearchedPensionModel[] = [];

    mockPensionPotRepository.findByAmountOver.mockResolvedValue(
      mockPensionPots,
    );
    mockSearchedPensionRepository.findByAmountOver.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await filterPotUseCase.filterPots({
      amount: 1000,
      direction: 'greater',
    });

    expect(mockPensionPotRepository.findByAmountOver).toHaveBeenCalledWith(
      1000,
    );
    expect(result.data).toEqual([...mockPensionPots, ...mockSearchedPensions]);
  });

  it('should return all pots if no filter is provided', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: 'pension-123',
        potName: 'Test Pot',
        annualInterestRate: 0.03,
        defaultAnnualInterestRate: 0.02,
        amount: 1000,
        employer: 'Test Employer',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        monthlyPayment: 100,
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider', value: 'PROVIDER' },
      },
    ];

    const mockSearchedPensions: SearchedPensionModel[] = [
      {
        id: 'searched-123',
        potName: 'Searched Pot',
        annualInterestRate: 0.01,
        defaultAnnualInterestRate: 0.01,
        amount: 500,
        employer: 'Searched Employer',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        pensionProvider: {
          name: 'Searched Provider',
          value: 'SEARCHED_PROVIDER',
        },
        status: 'TO_HUNT',
        foundOn: '2024-01-01T00:00:00.000Z',
        isDraft: true,
        previousName: null,
        previousAddress: 'Some Address',
        policyNumber: '',
        annualFee: 0,
      },
    ];

    mockPensionPotRepository.findAll.mockResolvedValue(mockPensionPots);
    mockSearchedPensionRepository.findAll.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await filterPotUseCase.filterPots();

    expect(mockPensionPotRepository.findAll).toHaveBeenCalled();
    expect(mockSearchedPensionRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual([...mockPensionPots, ...mockSearchedPensions]);
  });

  it('should throw NotFoundException if no pots match the criteria', async () => {
    mockPensionPotRepository.findByName.mockResolvedValue(null);
    mockSearchedPensionRepository.findByName.mockResolvedValue(null);

    await expect(
      filterPotUseCase.filterPots({
        name: 'Test Pot',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException if an error occurs', async () => {
    mockPensionPotRepository.findAll.mockRejectedValue(
      new Error('Database error'),
    );

    await expect(filterPotUseCase.filterPots()).rejects.toThrow(
      BadRequestException,
    );
  });
});
