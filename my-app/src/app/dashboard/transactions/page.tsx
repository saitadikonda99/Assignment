'use client';

import { useState, useMemo } from 'react';
import { MdSearch, MdSwapVert, MdDeleteOutline, MdAdd } from 'react-icons/md';
import { mockTransactions } from '../../data/mockData';
import { Transaction } from '../../types/index';
import { useRole } from '../../context/RoleContext';
import AddTransactionModal from '../../components/ui/AddTransactionModal/AddTransactionModal';
import './Transactions.css';

const allCategories = Array.from(new Set(mockTransactions.map(t => t.category)));

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatAmount = (t: Transaction) => {
  const sign = t.type === 'income' ? '+' : '-';
  return `${sign}$${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const page = () => {
  const { role } = useRole();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch]             = useState('');
  const [filterType, setFilterType]     = useState('all');
  const [filterCat, setFilterCat]       = useState('all');
  const [sortField, setSortField]       = useState<'date' | 'amount'>('date');
  const [sortAsc, setSortAsc]           = useState(false);

  const displayed = useMemo(() => {
    let list = [...transactions];

    if (search)         list = list.filter(t => t.description.toLowerCase().includes(search.toLowerCase()));
    if (filterType !== 'all') list = list.filter(t => t.type === filterType);
    if (filterCat  !== 'all') list = list.filter(t => t.category === filterCat);

    list.sort((a, b) => {
      const valA = sortField === 'date' ? new Date(a.date).getTime() : a.amount;
      const valB = sortField === 'date' ? new Date(b.date).getTime() : b.amount;
      return sortAsc ? valA - valB : valB - valA;
    });

    return list;
  }, [transactions, search, filterType, filterCat, sortField, sortAsc]);

  const handleDelete = (id: string) =>
    setTransactions(prev => prev.filter(t => t.id !== id));

  return (
    <div className="TransactionsPage">
      <div className="TransactionsPage__header">
        <h1 className="TransactionsPage__title">Transactions</h1>
        {role === 'Admin' && (
          <button className="TransactionsPage__add-btn" onClick={() => setShowModal(true)}>
            <MdAdd size={18} />
            Add Transaction
          </button>
        )}
      </div>

      <div className="TransactionsPage__filters">
        <div className="TransactionsPage__search">
          <MdSearch size={18} className="TransactionsPage__search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="TransactionsPage__search-input"
          />
        </div>

        <select
          className="TransactionsPage__select"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="TransactionsPage__select"
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
        >
          <option value="all">All Categories</option>
          {allCategories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="TransactionsPage__select"
          value={sortField}
          onChange={e => setSortField(e.target.value as 'date' | 'amount')}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <button
          className="TransactionsPage__sort-toggle"
          onClick={() => setSortAsc(prev => !prev)}
          title={sortAsc ? 'Ascending' : 'Descending'}
        >
          <MdSwapVert size={20} />
        </button>
      </div>

      <div className="TransactionsPage__table-wrap">
        <table className="TransactionsPage__table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td colSpan={5} className="TransactionsPage__empty">No transactions found.</td>
              </tr>
            ) : (
              displayed.map(t => (
                <tr key={t.id} className="TransactionsPage__row">
                  <td className="TransactionsPage__date">{formatDate(t.date)}</td>
                  <td className="TransactionsPage__desc">{t.description}</td>
                  <td>
                    <span className="TransactionsPage__category">{t.category}</span>
                  </td>
                  <td className={`TransactionsPage__amount TransactionsPage__amount--${t.type}`}>
                    {formatAmount(t)}
                  </td>
                  <td>
                    <button
                      className="TransactionsPage__delete"
                      onClick={() => handleDelete(t.id)}
                      title="Delete"
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={(t) => setTransactions(prev => [t, ...prev])}
        />
      )}
    </div>
  );
};

export default page;
