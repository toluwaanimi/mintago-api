import { FilterSearchPensionByStatusUsecase } from '../filter-search-pension-by-status.usecase';
import { mockSearchedPensionRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import { NotFoundException } from '@nestjs/common';

describe('FilterSearchPensionByStatusUsecase', () => {
  let filterSearchPensionByStatusUsecase: FilterSearchPensionByStatusUsecase;

  beforeEach(() => {
    filterSearchPensionByStatusUsecase = new FilterSearchPensionByStatusUsecase(
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return a searched pension when found by status', async () => {
    const mockSearchedPension: SearchedPensionModel = {
      annualFee: 0,
      policyNumber: '',
      id: '1',
      potName: 'Searched Pot 1',
      amount: 5000,
      annualInterestRate: 3,
      defaultAnnualInterestRate: 3,
      employer: 'Employer 1',
      lastUpdatedAt: '2024-01-01T00:00:00.000Z',
      pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
      status: 'FOUND',
      foundOn: '2024-01-01T00:00:00.000Z',
      isDraft: false,
      previousName: null,
      previousAddress: 'Some Address',
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
