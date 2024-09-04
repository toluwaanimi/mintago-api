import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { BadRequestException } from '@nestjs/common';

export class CalculatePensionPotsForecastedBalanceUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Get all pension pots with their forecasted balance after a given number of years
   * @param years Number of years to forecast the pension pots
   */
  async getPensionPotsForecastedBalance(years: number) {
    try {
      // Fetch all pension pots
      const pots = await this.pensionPotRepository.findAll();

      // Calculate forecasted balance for each pot
      const forecastedPots = pots.map((pot) => {
        const annualInterestRate =
          pot.annualInterestRate ?? pot.defaultAnnualInterestRate;
        const monthlyPayment = pot.monthlyPayment || 0; // Ensure monthly payment is valid

        // Calculate the forecasted balance
        const forecastedBalance = this.calculateForecastedBalance(
          pot.amount,
          monthlyPayment,
          annualInterestRate,
          years,
        );

        return {
          ...pot,
          forecastedBalance,
        };
      });

      // Return the list of pots with forecasted balances
      return { data: forecastedPots };
    } catch (error) {
      this.logger.error('Error calculating forecasted balances', error);
      throw new BadRequestException('Could not calculate forecasted balances');
    }
  }

  /**
   * Helper function to calculate the forecasted balance of a pension pot
   * @param currentBalance Initial balance of the pot
   * @param monthlyPayment Amount added to the pot every month
   * @param annualInterestRate Interest rate applied annually
   * @param years Number of years for which to forecast
   * @returns Forecasted balance after the given years
   */
  private calculateForecastedBalance(
    currentBalance: number,
    monthlyPayment: number,
    annualInterestRate: number,
    years: number,
  ): number {
    const monthlyRate = annualInterestRate / 12 / 100; // Convert annual rate to a monthly rate
    const months = years * 12; // Total months in the given years
    let balance = currentBalance;

    for (let i = 0; i < months; i++) {
      balance += monthlyPayment; // Add monthly payment
      balance += balance * monthlyRate; // Apply monthly interest
    }

    return balance;
  }
}
