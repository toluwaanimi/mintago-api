import { GetPensionPotsUseCase } from '../get-pension-pots.usecase';
import { mockPensionPotRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';

describe('GetPensionPotsUseCase', () => {
  let getPensionPotsUseCase: GetPensionPotsUseCase;

  beforeEach(() => {
    getPensionPotsUseCase = new GetPensionPotsUseCase(
      mockPensionPotRepository,
      mockLogger,
    );
  });

  it('should return pension pots data', async () => {
    const mockPensionPots = [
      {
        id: 'e181e498-9cab-4570-a188-ed699dc5eefd',
        potName: 'Google',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        amount: 36700,
        employer: 'Google',
        lastUpdatedAt: '2024-06-13T13:23:55.614Z',
        monthlyPayment: 335.53,
        isWorkplacePension: true,
        pensionProvider: {
          name: 'Aviva',
          value: 'AVIVA',
        },
      },
      {
        id: '5de51030-02f3-48c0-bd54-024120bac5ba',
        potName: 'IBM',
        annualInterestRate: 0.04,
        amount: 20000,
        employer: 'IBM',
        lastUpdatedAt: '2024-08-05T14:31:20.506Z',
        defaultAnnualInterestRate: 0.02,
        monthlyPayment: 0,
        isWorkplacePension: false,
        pensionProvider: {
          name: 'Scottish Widows',
          value: 'SCOTTISH_WIDOWS',
        },
      },
    ];
    mockPensionPotRepository.findAll.mockResolvedValue(mockPensionPots);

    const result = await getPensionPotsUseCase.getPensionPots();

    expect(mockPensionPotRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual(mockPensionPots);
  });

  it('should return an empty array if no pension pots are found', async () => {
    mockPensionPotRepository.findAll.mockResolvedValue([]);

    const result = await getPensionPotsUseCase.getPensionPots();

    expect(result.data).toEqual([]);
  });
});
