# Finance Dashboard

A personal finance dashboard built with Next.js 16, React 19, and Recharts. Users can track income and expenses, explore transactions, and understand spending patterns — all from a clean, responsive UI.

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# 1. Clone the repository
git clone <repo-url>
cd Assignment/my-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app redirects to `/dashboard/home`.

### Other Commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## Project Structure

```
my-app/src/app/
├── components/
│   ├── layout/
│   │   └── navbar/          # Navbar with responsive hamburger menu
│   └── ui/
│       ├── StatsCard/        # Reusable summary stat card
│       ├── BalanceTrend/     # Monthly income vs expenses bar chart
│       ├── SpendingBreakdown/# Category spending radar chart
│       └── AddTransactionModal/ # Modal form to add a transaction
├── context/
│   └── RoleContext.tsx       # Global role state (Admin / User)
├── data/
│   └── mockData.ts           # Mock transactions and monthly data
├── types/
│   └── index.ts              # Shared TypeScript types
└── dashboard/
    ├── home/                 # Overview page
    ├── transactions/         # Transactions list page
    └── insights/             # Insights & spending analysis page
```

---

## Approach

### Tech Stack

| Concern        | Choice                        |
|----------------|-------------------------------|
| Framework      | Next.js 16 (App Router)       |
| Language       | TypeScript                    |
| Styling        | Plain CSS (BEM naming)        |
| Charts         | Recharts                      |
| Icons          | react-icons                   |
| State          | React Context + useState      |

### Design Decisions

**CSS over Tailwind** — Each component has a co-located `.css` file using BEM class naming (e.g. `StatsCard__value`). This keeps styles scoped, readable, and easy to override without a build-time dependency on utility classes.

**No external state library** — The app has two pieces of shared state: the role (global, via `RoleContext`) and transactions (local to the transactions page via `useState`). This is enough complexity for the scope — Redux or Zustand would be overkill here.

**Mock data as the source of truth** — All computed values (totals, diffs, category breakdowns) are derived at runtime from `mockData.ts` using plain array methods. No hardcoded display values anywhere.

**Component-level reuse** — `StatsCard`, `BalanceTrend`, `SpendingBreakdown`, and `AddTransactionModal` are standalone components in `src/app/components/ui/`, each with their own CSS, so they can be dropped into any page.

---

## Features

### 1. Dashboard Overview (`/dashboard/home`)

- **Summary cards** — Total Balance, Total Income, Total Expenses, and Savings Rate. Each card shows the current value, a month-over-month trend with a green/red indicator, and a sub-label with transaction count context.
- **Balance Trend chart** — Stacked bar chart (income vs expenses) across the last 6 months using `monthlyData`.
- **Spending Breakdown chart** — Radar chart showing relative spend across all expense categories derived from `mockTransactions`.

### 2. Transactions (`/dashboard/transactions`)

- Full transaction list with Date, Description, Category pill, and a color-coded Amount (green for income, red for expense).
- **Search** — Filter by description (case-insensitive, real-time).
- **Type filter** — All / Income / Expense dropdown.
- **Category filter** — Dropdown populated dynamically from the data.
- **Sort** — Sort by Date or Amount, with an asc/desc toggle button.
- **Delete** — Remove any transaction from the list (local state).
- **Add Transaction (Admin only)** — Opens a modal form with fields for Description, Amount, Date, Type, and Category. Validates required fields and positive amount before adding to the list.

### 3. Role-Based UI

- A role selector dropdown in the navbar lets you switch between **Admin** and **User** at any time.
- The selected role is stored in `RoleContext` and available across all pages.
- **User** — Read-only access. The "Add Transaction" button is hidden.
- **Admin** — Full access. The "Add Transaction" button is visible and functional.

### 4. Insights (`/dashboard/insights`)

- **Highest Spending Category** — The category with the greatest total spend, shown as a dollar amount and percentage of all expenses.
- **Biggest Single Expense** — The single largest expense transaction with its description and date.
- **Savings Rate** — Current month's net savings as a percentage of income, compared to the previous month.
- **Most Frequent Category** — The expense category with the most transactions.
- **Spending by Category** — Horizontal progress bars for every expense category, sorted by amount, giving an at-a-glance breakdown.

### 5. Responsive Design

- The navbar collapses to a hamburger menu on screens ≤ 768px, with a dropdown showing all links and the role selector.
- Summary card grids collapse from 4 columns → 2 columns → 1 column at standard breakpoints.
- The Balance Trend / Spending Breakdown side-by-side layout stacks vertically on smaller screens.
- The Add Transaction modal is full-width on mobile with single-column fields.

---

## Data

All data lives in [`src/app/data/mockData.ts`](my-app/src/app/data/mockData.ts):

- **`mockTransactions`** — 27 transactions across Jan–Mar 2026, covering income (Salary, Freelance, Investment) and expenses across 9 categories.
- **`monthlyData`** — Pre-aggregated monthly summaries for Oct 2025–Mar 2026, used for the Balance Trend chart.

No external API or database is required. All computed stats (totals, diffs, category breakdowns) are derived from this data at render time.
