'use client';

import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Transaction, Category, TransactionType } from '../../../types/index';
import './AddTransactionModal.css';

const CATEGORIES: Category[] = [
  'Salary', 'Freelance', 'Food & Dining', 'Transportation',
  'Shopping', 'Entertainment', 'Bills & Utilities', 'Healthcare',
  'Travel', 'Education', 'Investment', 'Other',
];

interface Props {
  onClose: () => void;
  onAdd: (t: Transaction) => void;
}

const empty = { description: '', amount: '', date: '', type: 'expense' as TransactionType, category: 'Other' as Category };

const AddTransactionModal = ({ onClose, onAdd }: Props) => {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description.trim() || !form.amount || !form.date) {
      setError('All fields are required.');
      return;
    }
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    onAdd({
      id: Date.now().toString(),
      description: form.description.trim(),
      amount,
      date: form.date,
      type: form.type,
      category: form.category,
    });
    onClose();
  };

  const set = (field: string, value: string) => {
    setError('');
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="Modal__overlay" onClick={onClose}>
      <div className="Modal__box" onClick={e => e.stopPropagation()}>
        <div className="Modal__header">
          <h2 className="Modal__title">Add Transaction</h2>
          <button className="Modal__close" onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        <form className="Modal__form" onSubmit={handleSubmit}>
          <div className="Modal__field">
            <label className="Modal__label">Description</label>
            <input
              className="Modal__input"
              type="text"
              placeholder="e.g. Monthly Salary"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          <div className="Modal__row">
            <div className="Modal__field">
              <label className="Modal__label">Amount ($)</label>
              <input
                className="Modal__input"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
              />
            </div>

            <div className="Modal__field">
              <label className="Modal__label">Date</label>
              <input
                className="Modal__input"
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
          </div>

          <div className="Modal__row">
            <div className="Modal__field">
              <label className="Modal__label">Type</label>
              <select
                className="Modal__select"
                value={form.type}
                onChange={e => set('type', e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="Modal__field">
              <label className="Modal__label">Category</label>
              <select
                className="Modal__select"
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="Modal__error">{error}</p>}

          <div className="Modal__actions">
            <button type="button" className="Modal__cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="Modal__submit">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
