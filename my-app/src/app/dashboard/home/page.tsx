import { mockTransactions } from '../../data/mockData';
import StatsCard from '../../components/ui/StatsCard/StatsCard';
import './Home.css';

const fmt = (n: number) =>
  `$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const curMonth = '2026-03';
const prevMonth = '2026-02';

const curTransactions  = mockTransactions.filter(t => t.date.startsWith(curMonth));
const prevTransactions = mockTransactions.filter(t => t.date.startsWith(prevMonth));

const curIncome   = curTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
const curExpenses = curTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
const curNet      = curIncome - curExpenses;
const curSavings  = (curNet / curIncome) * 100;

const prevIncome   = prevTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
const prevExpenses = prevTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
const prevNet      = prevIncome - prevExpenses;
const prevSavings  = (prevNet / prevIncome) * 100;

const totalIncome   = mockTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
const totalExpenses = mockTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
const totalBalance  = totalIncome - totalExpenses;

const incomeDiff   = curIncome - prevIncome;
const expenseDiff  = curExpenses - prevExpenses;
const netDiff      = curNet - prevNet;
const savingsDiff  = curSavings - prevSavings;

const allIncomeTransactions  = mockTransactions.filter(t => t.type === 'income').length;
const allExpenseTransactions = mockTransactions.filter(t => t.type === 'expense').length;

const statsCards = [
  {
    label: 'Total Balance',
    value: fmt(totalBalance),
    trend: `${netDiff >= 0 ? '+' : '-'}${fmt(netDiff)}`,
    trendPositive: netDiff >= 0,
    subLabel: `Based on ${mockTransactions.length} transactions`,
  },
  {
    label: 'Total Income',
    value: fmt(totalIncome),
    trend: `${incomeDiff >= 0 ? '+' : '-'}${fmt(incomeDiff)}`,
    trendPositive: incomeDiff >= 0,
    subLabel: `Based on ${allIncomeTransactions} income entries`,
  },
  {
    label: 'Total Expenses',
    value: fmt(totalExpenses),
    trend: `${expenseDiff >= 0 ? '+' : '-'}${fmt(expenseDiff)}`,
    trendPositive: expenseDiff <= 0,
    subLabel: `Based on ${allExpenseTransactions} expense entries`,
  },
  {
    label: 'Savings Rate',
    value: `${curSavings.toFixed(1)}%`,
    trend: `${savingsDiff >= 0 ? '+' : ''}${savingsDiff.toFixed(1)}%`,
    trendPositive: savingsDiff >= 0,
    subLabel: `Up from ${prevSavings.toFixed(1)}% last month`,
  },
];

const page = () => {
  return (
    <div className="HomePage">
      <div className="HomePage__stats">
        {statsCards.map((card) => (
          <StatsCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
};

export default page;
