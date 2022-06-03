import { definitions } from './supabase';

export type TransWithFormattedDate = {
  [key: string]: {
    expenses: number;
    day: string;
    trans: (definitions['transaction'] & { formattedDate: string })[];
  };
};
