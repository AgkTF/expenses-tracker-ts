import { definitions } from './supabase';

export interface IMonthPlanForm {
  openingBalance: number;
  expensesCategories: definitions['money_category'][];
  incomeCategories: definitions['money_category'][];
}
