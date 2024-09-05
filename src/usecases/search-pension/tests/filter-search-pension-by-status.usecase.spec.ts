import { FilterSearchPensionByStatusUsecase } from '../filter-search-pension-by-status.usecase';
import { mockSearchedPensionRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { NotFoundException } from '@nestjs/common';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';

describe('FilterSearchPensionByStatusUsecase', () => {
  let filterSearchPensionByStatusUsecase: FilterSearchPensionByStatusUsecase;

  beforeEach(() => {
    filterSearchPensionByStatusUsecase = new FilterSearchPensionByStatusUsecase(
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return a searched pension when found by status', async () => {
    const mockSearchedPension: PensionPotModel = {
      annualInterestRate: 0,
      defaultAnnualInterestRate: 0,
      isWorkplacePension: false,
      monthlyPayment: 0,
      id: '3a1a354e-c1a5-4d4c-aeff-df3b3fe4d499',
      potName: 'Pension',
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 40000,
      employer: 'Telegraph',
      lastUpdatedAt: '2024-06-11T10:52:33.819',
      searchedPension: {
        id: '3a1a354e-c1a5-4d4c-aeff-df3b3fe4d499',
        pension_pot_id: '4b6004d2-58f6-45c6-9a27-045b9571ae3e',
        lastUpdatedAt: '2024-06-11T10:52:33.819',
        policyNumber: null,
        annualFee: null,
        status: 'FOUND',
        previousName: null,
        previousAddress: '12 Something St',
        foundOn: '2024-08-11T10:52:33.819',
        isDraft: false,
      },
    };

    mockSearchedPensionRepository.findByStatus.mockResolvedValue([
      mockSearchedPension,
    ]);

    const result =
      await filterSearchPensionByStatusUsecase.filterPensionPotByStatus();

    expect(mockSearchedPensionRepository.findByStatus).toHaveBeenCalledWith(
      'FOUND',
    );
    expect(result.data).toEqual([mockSearchedPension]);
  });

  it('should throw NotFoundException if no searched pension is found with the given status', async () => {
    mockSearchedPensionRepository.findByStatus.mockResolvedValue(null);

    await expect(
      filterSearchPensionByStatusUsecase.filterPensionPotByStatus(),
    ).rejects.toThrow(NotFoundException);
  });
});
