import { CalculatePensionPotsForecastedBalanceUseCase } from '../calculate-pension-pots-forecasted-balance.usecase';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { BadRequestException } from '@nestjs/common';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { mockPensionPotRepository } from '../../../infrastructure/common/tests/mock/repository.mock';

describe('CalculatePensionPotsForecastedBalanceUseCase', () => {
  let calculatePensionPotsForecastedBalanceUseCase: CalculatePensionPotsForecastedBalanceUseCase;

  beforeEach(() => {
    calculatePensionPotsForecastedBalanceUseCase =
      new CalculatePensionPotsForecastedBalanceUseCase(
        mockPensionPotRepository,
        mockLogger,
      );
  });

  it('should calculate the forecasted balance for each pension pot', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: '1',
        potName: 'Pot 1',
        amount: 10000,
        monthlyPayment: 100,
        annualInterestRate: 5,
        defaultAnnualInterestRate: 3,
        employer: 'Employer 1',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
      },
      {
        id: '2',
        potName: 'Pot 2',
        amount: 20000,
        monthlyPayment: 0,
        annualInterestRate: null,
        defaultAnnualInterestRate: 3,
        employer: 'Employer 2',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        isWorkplacePension: false,
        pensionProvider: { name: 'Provider 2', value: 'PROVIDER_2' },
      },
    ];

    mockPensionPotRepository.findAll.mockResolvedValue(mockPensionPots);

    const result =
      await calculatePensionPotsForecastedBalanceUseCase.getPensionPotsForecastedBalance(
        10,
      );

    expect(mockPensionPotRepository.findAll).toHaveBeenCalled();
    expect(result.data).toHaveLength(2);
  });

  it('should handle the case where annualInterestRate is null by using defaultAnnualInterestRate', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
        id: '1',
        potName: 'Pot 1',
        amount: 10000,
        monthlyPayment: 0,
        annualInterestRate: null,
        defaultAnnualInterestRate: 4,
        employer: 'Employer 1',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        isWorkplacePension: true,
        pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
      },
    ];

    mockPensionPotRepository.findAll.mockResolvedValue(mockPensionPots);

    const result =
      await calculatePensionPotsForecastedBalanceUseCase.getPensionPotsForecastedBalance(
        5,
      );

    expect(result.data[0].forecastedBalance).toBeDefined();
  });

  it('should throw BadRequestException if an error occurs during the calculation', async () => {
    mockPensionPotRepository.findAll.mockRejectedValue(
      new Error('Database error'),
    );

    await expect(
      calculatePensionPotsForecastedBalanceUseCase.getPensionPotsForecastedBalance(
        10,
      ),
    ).rejects.toThrow(BadRequestException);
    expect(mockLogger.error).toHaveBeenCalledWith(
      'Error calculating forecasted balances',
      expect.any(Error),
    );
  });
});
