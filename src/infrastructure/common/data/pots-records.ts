import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';

export const defaultPots = {
  pensionPots: [
    {
      id: 'e181e498-9cab-4570-a188-ed699dc5eefd',
      potName: 'Google',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: 'Aviva',
        value: 'AVIVA',
      },
      amount: 36700,
      employer: 'Google',
      lastUpdatedAt: '2024-06-13T13:23:55.614Z',
      monthlyPayment: 335.53,
      isWorkplacePension: true,
    },
    {
      id: '5de51030-02f3-48c0-bd54-024120bac5ba',
      potName: 'IBM',
      annualInterestRate: 0.04,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: 'Scottish Widows',
        value: 'SCOTTISH_WIDOWS',
      },
      amount: 20000,
      employer: 'IBM',
      lastUpdatedAt: '2024-08-05T14:31:20.506Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
    },
    {
      id: '1509481e-565d-444a-8e24-d72d3244b663',
      potName: 'Mintago',
      annualInterestRate: null,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 100,
      employer: 'Mintago',
      lastUpdatedAt: '2024-05-22T17:56:45.028Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
    },
    {
      id: 'c759b80a-558a-488d-aba9-f1ee9593020b',
      potName: 'Microsoft',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 123868,
      employer: 'Microsoft',
      lastUpdatedAt: '2024-05-23T13:42:22.780Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
    },
    {
      id: '3e2bfea6-d7bb-4ef6-8dea-2a149b4ef24c',
      potName: 'Pot 1',
      annualInterestRate: 0.035,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 12345,
      employer: null,
      lastUpdatedAt: '2024-05-23T13:42:38.354Z',
      monthlyPayment: 300,
      isWorkplacePension: false,
    },
    {
      id: '1bbb9dfc-eb62-4988-9fab-7e0a52844d8c',
      potName: 'Pot 2',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 1200,
      employer: null,
      lastUpdatedAt: '2024-05-23T13:43:12.606Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
    },
    {
      id: 'd18083cf-4990-4248-a3e8-37140706a8d7',
      potName: 'A company',
      annualInterestRate: 0.002,
      defaultAnnualInterestRate: 2,
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 40000,
      employer: null,
      lastUpdatedAt: '2024-08-05T14:31:26.067Z',
      monthlyPayment: 200,
      isWorkplacePension: false,
    },
    {
      id: '0a4c2ed0-3b0c-4606-817e-e6f8d14dbfd2',
      potName: 'Searched Pension',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 0,
      employer: 'Homebase',
      lastUpdatedAt: '2022-05-21T17:32:03.376Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
    },
    {
      id: '4b6004d2-58f6-45c6-9a27-045b9571ae3e',
      potName: 'Pension',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 40000,
      employer: 'Telegraph',
      lastUpdatedAt: '2024-06-11T10:52:33.819Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
    },
  ],
  searchedPensions: [
    {
      id: '9f0b9d90-6a8e-4c23-b784-4bce4a5c3d7f',
      pension_pot_id: '0a4c2ed0-3b0c-4606-817e-e6f8d14dbfd2',
      policyNumber: null,
      annualFee: null,
      status: 'TO_HUNT',
      previousName: null,
      previousAddress: '12 Something St',
      foundOn: '2020-06-11T10:52:33.819Z',
      lastUpdatedAt: '2024-06-11T10:52:33.819Z',
      isDraft: true,
    },
    {
      id: '3a1a354e-c1a5-4d4c-aeff-df3b3fe4d499',
      pension_pot_id: '4b6004d2-58f6-45c6-9a27-045b9571ae3e',
      policyNumber: null,
      annualFee: null,
      status: 'FOUND',
      previousName: null,
      previousAddress: '12 Something St',
      foundOn: '2024-08-11T10:52:33.819Z',
      lastUpdatedAt: '2024-06-11T10:52:33.819Z',
      isDraft: false,
    },
  ],
};

export function linkSearchedPensions(
  pensionPots: PensionPotModel[],
  searchedPensions: SearchedPensionModel[],
): PensionPotModel[] {
  const searchedPensionMap = searchedPensions.reduce(
    (acc, searchedPension) => {
      acc[searchedPension.pension_pot_id] = searchedPension;
      return acc;
    },
    {} as { [key: string]: SearchedPensionModel },
  );

  return pensionPots.map((pensionPot) => {
    const relatedSearchedPension = searchedPensionMap[pensionPot.id];
    return {
      ...pensionPot,
      searchedPension: relatedSearchedPension || undefined,
    };
  });
}

export function linkPotsToSearchedPensions(
  pensionPots: PensionPotModel[],
  searchedPensions: SearchedPensionModel[],
): PensionPotModel[] {
  const searchedPensionMap = searchedPensions.reduce(
    (acc, searchedPension) => {
      acc[searchedPension.pension_pot_id] = searchedPension;
      return acc;
    },
    {} as { [key: string]: SearchedPensionModel },
  );

  return pensionPots.map((pensionPot) => {
    const relatedSearchedPension = searchedPensionMap[pensionPot.id];
    return {
      ...pensionPot,
      searchedPension: relatedSearchedPension || undefined,
    };
  });
}
