import { NotFoundException, BadRequestException } from '@nestjs/common';
import { FilterPotUseCase } from '../filter-pot.usecase';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { mockPensionPotRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';

describe('FilterPotUseCase', () => {
  let filterPotUseCase: FilterPotUseCase;

  beforeEach(() => {
    filterPotUseCase = new FilterPotUseCase(
      mockPensionPotRepository,
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

    const mockSearchedPensions: PensionPotModel[] = [];

    mockPensionPotRepository.findByEmployer.mockResolvedValue(mockPensionPots);

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

    const mockSearchedPensions: PensionPotModel[] = [];

    mockPensionPotRepository.findByAmountOver.mockResolvedValue(
      mockPensionPots,
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

    mockPensionPotRepository.findAll.mockResolvedValue(mockPensionPots);

    const result = await filterPotUseCase.filterPots();

    expect(mockPensionPotRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual([...mockPensionPots]);
  });

  it('should throw NotFoundException if no pots match the criteria', async () => {
    mockPensionPotRepository.findByName.mockResolvedValue(null);

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
