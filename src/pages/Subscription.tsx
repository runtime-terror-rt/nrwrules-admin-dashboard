import { Card, Icon, PageHeader, SearchInput } from '../components'
import { theme } from '../constants'
import {
  transactionLedgerRows,
  userSubscriptionCards,
  type UserSubscriptionCard,
} from '../data'

/**
 * Subscription & Payment — Figma node 4132-18896.
 * Transaction Ledger table, Subscription Lifecycle form + toggles, User Subscriptions cards.
 */
export function Subscription() {
  return (
    <>
      <PageHeader
        title="Subscription & Payment"
        subtitle="Subscription & Payment"
        description="Manage subscriptions, transactions, and billing."
        action={
          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.color.primary }}
            onClick={() => {}}
          >
            <Icon name="plus" size={20} />
            New Subscription
          </button>
        }
      />

      {/* Transaction Ledger */}
      <section className="mb-10">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold" style={{ color: theme.color.primary }}>
            Transaction Ledger
          </h2>
          <SearchInput placeholder="Search" className="w-full sm:w-64" />
        </div>
        <div
          className="overflow-hidden rounded-xl border border-gray-200"
          style={{ boxShadow: theme.shadow.card }}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="bg-[#FEE3ED] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">
                  Provider
                </th>
                <th className="bg-[#FEE3ED] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">
                  Card
                </th>
                <th className="bg-[#FEE3ED] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">
                  Invoice
                </th>
                <th className="bg-[#FEE3ED] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">
                  Amount
                </th>
                <th className="bg-[#FEE3ED] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">
                  Status
                </th>
                <th className="bg-[#FEE3ED] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">
                  Issued At
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionLedgerRows.map((row, i) => (
                <tr
                  key={row.id}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-[#FDF1F5]'}
                >
                  <td className="px-4 py-3">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {row.provider}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.card}</td>
                  <td className="px-4 py-3">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 font-medium text-red-600 hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      {row.invoice}
                      <Icon name="external-link" size={14} className="inline shrink-0" />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.amount}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.issuedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subscription Lifecycle */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold" style={{ color: theme.color.primary }}>
          Subscription Lifecycle
        </h2>
        <Card className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                User
              </label>
              <input
                type="text"
                placeholder="Privacy Policy"
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                Plan
              </label>
              <input
                type="text"
                placeholder="Privacy Policy"
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                Lifecycle Status
              </label>
              <input
                type="text"
                placeholder="privacy"
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                Started At
              </label>
              <input
                type="text"
                placeholder="Privacy Policy"
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                Expires At
              </label>
              <input
                type="text"
                placeholder="Privacy Policy"
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                Cancelled At
              </label>
              <input
                type="text"
                placeholder="privacy"
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Account Active</span>
              <ToggleSwitch on color="blue" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Auto Renew</span>
              <ToggleSwitch on color="pink" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.color.primary }}
              onClick={() => {}}
            >
              Create Subscription
            </button>
            <button
              type="button"
              className="rounded-lg border-2 border-orange-400 bg-transparent px-6 py-2.5 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50"
              onClick={() => {}}
            >
              Cancel
            </button>
          </div>
        </Card>
      </section>

      {/* User Subscriptions Cards */}
      <section>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: theme.color.primary }}>
          User Subscriptions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userSubscriptionCards.map((sub) => (
            <UserSubscriptionCard key={sub.id} card={sub} />
          ))}
        </div>
      </section>
    </>
  )
}

function ToggleSwitch({ on, color }: { on: boolean; color: 'blue' | 'pink' }) {
  const bg = on
    ? color === 'blue'
      ? 'bg-blue-500'
      : 'bg-[var(--color-primary)]'
    : 'bg-gray-300'
  return (
    <button
      type="button"
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${bg}`}
      onClick={() => {}}
      aria-pressed={on}
      aria-label={color === 'blue' ? 'Account Active' : 'Auto Renew'}
    >
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function UserSubscriptionCard({ card }: { card: UserSubscriptionCard }) {
  return (
    <Card className="relative flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: theme.color.activeNav }}
          aria-hidden
        >
          <Icon name="subscription-box" size={24} primary />
        </span>
        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
          {card.status}
        </span>
      </div>
      <div>
        <p className="font-semibold text-gray-900">{card.userName}</p>
        <p className="text-sm" style={{ color: theme.color.primary }}>
          {card.plan}
        </p>
      </div>
      <div className="flex gap-4 text-xs text-gray-600">
        <span>STARTED {card.started}</span>
        <span>EXPIRES {card.expires}</span>
      </div>
      <div className="mt-auto flex justify-end gap-2">
        <button
          type="button"
          className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]"
          aria-label="Edit"
        >
          <Icon name="edit" size={18} />
        </button>
        <button
          type="button"
          className="p-1.5 text-gray-400 hover:text-red-500"
          aria-label="Delete"
        >
          <Icon name="trash" size={18} />
        </button>
      </div>
    </Card>
  )
}

