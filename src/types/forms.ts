import { definitions } from './supabase';

export interface IMonthPlanForm {
  openingBalance: number;
  // openingBalanceTrans: definitions['month_category'];
  expensesCategories: definitions['month_category'][];
  incomeCategories: definitions['month_category'][];
}

export interface ICategoriesSettings {
  categories: Partial<definitions['category']>[];
}
