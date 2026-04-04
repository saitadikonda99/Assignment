'use client';

import {
  MdOutlineCategory, MdReceiptLong, MdTrendingUp,
  MdLightbulb, MdAccountBalanceWallet,
} from 'react-icons/md';
import { mockTransactions, monthlyData } from '../../data/mockData';
import './Insights.css';

/* ── computed data ── */
const expenses = mockTransactions.filter(t => t.type === 'expense');

// category totals
const categoryTotals = expenses.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] ?? 0) + t.amount;
  return acc;
}, {});

const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

const topCategory    = sortedCategories[0];
const totalExpenses  = expenses.reduce((s, t) => s + t.amount, 0);
const topCategoryPct = ((topCategory[1] / totalExpenses) * 100).toFixed(0);
const maxCategoryAmt = sortedCategories[0][1];

// biggest single expense
const biggestExpense = expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0]);

// savings rate (latest vs previous month)
const latest   = monthlyData[monthlyData.length - 1];
const previous = monthlyData[monthlyData.length - 2];

// category frequency
const categoryFreq = expenses.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] ?? 0) + 1;
  return acc;
}, {});
const topFreqCat = Object.entries(categoryFreq).sort((a, b) => b[1] - a[1])[0];

const fmt = (n: number) =>
  `$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ── component ── */
const page = () => {
  return (
    <div className="InsightsPage">
      <h1 className="InsightsPage__title">Insights</h1>

      {/* Highlight cards */}
      <div className="InsightsPage__highlights">
        <div className="InsightsPage__card">
          <div className="InsightsPage__card-icon">
            <MdOutlineCategory size={20} />
          </div>
          <p className="InsightsPage__card-label">Highest Spending Category</p>
          <p className="InsightsPage__card-value">{topCategory[0]}</p>
          <p className="InsightsPage__card-sub">
            {fmt(topCategory[1])} &mdash; {topCategoryPct}% of total expenses
          </p>
        </div>

        <div className="InsightsPage__card">
          <div className="InsightsPage__card-icon">
            <MdReceiptLong size={20} />
          </div>
          <p className="InsightsPage__card-label">Biggest Single Expense</p>
          <p className="InsightsPage__card-value">{biggestExpense.description}</p>
          <p className="InsightsPage__card-sub">
            {fmt(biggestExpense.amount)} on {new Date(biggestExpense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>

        <div className="InsightsPage__card">
          <div className="InsightsPage__card-icon">
            <MdTrendingUp size={20} />
          </div>
          <p className="InsightsPage__card-label">Savings Rate (This Month)</p>
          <p className="InsightsPage__card-value">
            {((latest.balance / latest.income) * 100).toFixed(1)}%
          </p>
          <p className="InsightsPage__card-sub">
            Up from {((previous.balance / previous.income) * 100).toFixed(1)}% last month
          </p>
        </div>

        <div className="InsightsPage__card">
          <div className="InsightsPage__card-icon">
            <MdLightbulb size={20} />
          </div>
          <p className="InsightsPage__card-label">Most Frequent Category</p>
          <p className="InsightsPage__card-value">{topFreqCat[0]}</p>
          <p className="InsightsPage__card-sub">{topFreqCat[1]} transactions recorded</p>
        </div>
      </div>

      {/* Spending by Category */}
      <div className="InsightsPage__section">
        <div className="InsightsPage__section-header">
          <MdAccountBalanceWallet size={18} />
          <span>Spending by Category</span>
        </div>
        <div className="InsightsPage__category-list">
          {sortedCategories.map(([cat, amt]) => (
            <div key={cat} className="InsightsPage__category-row">
              <div className="InsightsPage__category-meta">
                <span className="InsightsPage__category-name">{cat}</span>
                <span className="InsightsPage__category-amt">{fmt(amt)}</span>
              </div>
              <div className="InsightsPage__bar-track">
                <div
                  className="InsightsPage__bar-fill"
                  style={{ width: `${(amt / maxCategoryAmt) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
