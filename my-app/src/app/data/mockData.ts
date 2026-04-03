import { Transaction, MonthlyData } from '../types/index';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-03-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '2', date: '2026-03-27', description: 'Grocery Store', amount: 89.50, category: 'Food & Dining', type: 'expense' },
  { id: '3', date: '2026-03-26', description: 'Uber Ride', amount: 24.00, category: 'Transportation', type: 'expense' },
  { id: '4', date: '2026-03-25', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: '5', date: '2026-03-24', description: 'Freelance Project', amount: 1200, category: 'Freelance', type: 'income' },
  { id: '6', date: '2026-03-23', description: 'Electric Bill', amount: 142.30, category: 'Bills & Utilities', type: 'expense' },
  { id: '7', date: '2026-03-22', description: 'Amazon Purchase', amount: 67.80, category: 'Shopping', type: 'expense' },
  { id: '8', date: '2026-03-21', description: 'Doctor Visit', amount: 150.00, category: 'Healthcare', type: 'expense' },
  { id: '9', date: '2026-03-20', description: 'Restaurant Dinner', amount: 56.40, category: 'Food & Dining', type: 'expense' },
  { id: '10', date: '2026-03-19', description: 'Gas Station', amount: 45.00, category: 'Transportation', type: 'expense' },
  { id: '11', date: '2026-03-18', description: 'Online Course', amount: 29.99, category: 'Education', type: 'expense' },
  { id: '12', date: '2026-03-17', description: 'Stock Dividend', amount: 85.00, category: 'Investment', type: 'income' },
  { id: '13', date: '2026-03-16', description: 'Coffee Shop', amount: 12.50, category: 'Food & Dining', type: 'expense' },
  { id: '14', date: '2026-03-15', description: 'Gym Membership', amount: 49.99, category: 'Healthcare', type: 'expense' },
  { id: '15', date: '2026-03-14', description: 'Movie Tickets', amount: 28.00, category: 'Entertainment', type: 'expense' },
  { id: '16', date: '2026-03-13', description: 'Freelance Bonus', amount: 500, category: 'Freelance', type: 'income' },
  { id: '17', date: '2026-03-12', description: 'Water Bill', amount: 38.50, category: 'Bills & Utilities', type: 'expense' },
  { id: '18', date: '2026-03-11', description: 'Book Purchase', amount: 22.99, category: 'Education', type: 'expense' },
  { id: '19', date: '2026-03-10', description: 'Flight Booking', amount: 320.00, category: 'Travel', type: 'expense' },
  { id: '20', date: '2026-03-09', description: 'Clothing Store', amount: 95.00, category: 'Shopping', type: 'expense' },
  { id: '21', date: '2026-02-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '22', date: '2026-02-20', description: 'Rent Payment', amount: 1500, category: 'Bills & Utilities', type: 'expense' },
  { id: '23', date: '2026-02-15', description: 'Freelance Work', amount: 800, category: 'Freelance', type: 'income' },
  { id: '24', date: '2026-02-10', description: 'Groceries', amount: 120, category: 'Food & Dining', type: 'expense' },
  { id: '25', date: '2026-01-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '26', date: '2026-01-15', description: 'Insurance', amount: 200, category: 'Healthcare', type: 'expense' },
  { id: '27', date: '2026-01-10', description: 'Holiday Gift', amount: 150, category: 'Shopping', type: 'expense' },
];

export const monthlyData: MonthlyData[] = [
  { month: 'Oct', income: 5800, expenses: 3200, balance: 2600 },
  { month: 'Nov', income: 6100, expenses: 3800, balance: 2300 },
  { month: 'Dec', income: 5500, expenses: 4200, balance: 1300 },
  { month: 'Jan', income: 5200, expenses: 2950, balance: 2250 },
  { month: 'Feb', income: 6000, expenses: 3420, balance: 2580 },
  { month: 'Mar', income: 6985, expenses: 3147, balance: 3838 },
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': 'hsl(var(--chart-1))',
  'Transportation': 'hsl(var(--chart-2))',
  'Shopping': 'hsl(var(--chart-3))',
  'Entertainment': 'hsl(var(--chart-4))',
  'Bills & Utilities': 'hsl(var(--chart-5))',
  'Healthcare': 'hsl(200, 70%, 50%)',
  'Travel': 'hsl(280, 60%, 55%)',
  'Education': 'hsl(140, 60%, 45%)',
  'Other': 'hsl(220, 10%, 60%)',
};
