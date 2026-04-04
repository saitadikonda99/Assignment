'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MdBarChart } from 'react-icons/md';
import { monthlyData } from '../../../data/mockData';
import './BalanceTrend.css';

const latestMonth  = monthlyData[monthlyData.length - 1];
const previousMonth = monthlyData[monthlyData.length - 2];
const diff = latestMonth.income - previousMonth.income;
const diffLabel = `${diff >= 0 ? '+' : ''}$${Math.abs(diff).toLocaleString('en-US', { minimumFractionDigits: 2 })} vs last month`;

const yFormatter = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`;


const BalanceTrend = () => {
  return (
    <div className="BalanceTrend">
      <div className="BalanceTrend__header">
        <div className="BalanceTrend__header-left">
          <div className="BalanceTrend__icon">
            <MdBarChart size={20} />
          </div>
          <span className="BalanceTrend__title">Balance Trend</span>
        </div>
        <div className="BalanceTrend__legend">
          <span className="BalanceTrend__legend-item BalanceTrend__legend-item--income">Income</span>
          <span className="BalanceTrend__legend-item BalanceTrend__legend-item--expenses">Expenses</span>
        </div>
      </div>

      <div className="BalanceTrend__meta">
        <p className="BalanceTrend__total">
          ${latestMonth.income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="BalanceTrend__subtitle">THIS MONTH VS LAST MONTH &nbsp;{diffLabel}</p>
      </div>

      <div className="BalanceTrend__chart">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData} barSize={48} barCategoryGap="30%">
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: '#6b7280' }}
            />
            <YAxis
              tickFormatter={yFormatter}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              width={45}
            />
            <Tooltip
              formatter={(value) => {
                const num = typeof value === 'number' ? value : 0;
                return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
              }}
              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 13 }}
            />
            <Bar dataKey="income"   stackId="a" fill="#111111" radius={[0, 0, 0, 0]} />
            <Bar dataKey="expenses" stackId="a" fill="#9ca3af" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrend;
