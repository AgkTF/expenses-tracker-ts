import { definitions } from './supabase';

export interface IMonthPlanForm {
  openingBalance: number;
  // openingBalanceTrans: definitions['money_category'];
  expensesCategories: definitions['money_category'][];
  incomeCategories: definitions['money_category'][];
}

export interface ICategoriesSettings {
  categories: Partial<definitions['category']>[];
}
