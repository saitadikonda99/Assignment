'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { MdGridView } from 'react-icons/md';
import { mockTransactions } from '../../../data/mockData';
import './SpendingBreakdown.css';

const categoryTotals: Record<string, number> = {};
mockTransactions
  .filter(t => t.type === 'expense')
  .forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] ?? 0) + t.amount;
  });

const radarData = Object.entries(categoryTotals).map(([category, amount]) => ({
  category,
  amount: Math.round(amount * 100) / 100,
}));


const SpendingBreakdown = () => {
  return (
    <div className="SpendingBreakdown">
      <div className="SpendingBreakdown__header">
        <div className="SpendingBreakdown__icon">
          <MdGridView size={20} />
        </div>
        <span className="SpendingBreakdown__title">Spending by Category</span>
      </div>

      <div className="SpendingBreakdown__chart">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip
              formatter={(value) => {
                const num = typeof value === 'number' ? value : 0;
                return [`$${num.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Spending'];
              }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 13 }}
            />
            <Radar
              dataKey="amount"
              stroke="#111111"
              fill="#4b5563"
              fillOpacity={0.75}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
