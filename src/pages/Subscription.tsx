/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Card, Icon, PageHeader, SearchInput } from '../components'
import { theme } from '../constants'

import SkeletonLoading from '@/components/SkeletonLoading'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useGetPlansQuery } from '@/redux/features/api/user/subscription'
import {
  useGetPaymentsQuery,
  useGetSubscribersQuery,
  useUpdatePlanMutation,
} from '@/redux/features/api/admin/subscription'

export function Subscription() {
  const { data: plansData, isLoading: plansLoading } = useGetPlansQuery(undefined)
  const { data: subscribersData, isLoading: subsLoading } = useGetSubscribersQuery(undefined)
  const { data: paymentsData, isLoading: paymentsLoading } = useGetPaymentsQuery(undefined)
  const [updatePlan] = useUpdatePlanMutation()

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-10">
      <PageHeader
        title="Subscription & Payment"
        subtitle="Subscription & Payment"
        description="Manage subscriptions, transactions, and billing."
      />

      {/* NEW SECTION: Existing Plans Settings */}
      <section>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: theme.color.primary }}>
          Existing Subscription Plans
        </h2>
        {plansLoading ? (
          <SkeletonLoading count={3} />
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {plansData?.data?.map((plan: any) => (
              <Card key={plan.id} className="border-t-4 border-t-pink-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800! text-lg">{plan.name}</h3>
                  <PlanEditModal
                    plan={plan}
                    onSave={(data) => updatePlan({ id: plan.id, ...data })}
                  />
                </div>
                <div className="text-2xl font-bold text-sky-600 mb-2">
                  ${plan.price}{' '}
                  <span className="text-xs text-gray-400 uppercase font-normal">
                    / {plan.billing_cycle}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{plan.description}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${plan.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                  />
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Transaction Ledger */}
      <section>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold" style={{ color: theme.color.primary }}>
            Transaction Ledger
          </h2>
          <SearchInput
            placeholder="Search payments..."
            className="w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#FEE3ED]">
                <th className="px-4 py-3 font-semibold uppercase text-gray-800">User</th>
                <th className="px-4 py-3 font-semibold uppercase text-gray-800">Method</th>
                <th className="px-4 py-3 font-semibold uppercase text-gray-800">Transaction ID</th>
                <th className="px-4 py-3 font-semibold uppercase text-gray-800">Amount</th>
                <th className="px-4 py-3 font-semibold uppercase text-gray-800">Status</th>
                <th className="px-4 py-3 font-semibold uppercase text-gray-800">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paymentsLoading ? (
                <tr>
                  <td colSpan={6}>
                    <SkeletonLoading count={1} direction="horizontal" />
                  </td>
                </tr>
              ) : paymentsData?.data.length === 0 ? (
                <tr className="text-center py-5">No payments found</tr>
              ) : (
                paymentsData?.data?.map((payment: any, i: number) => (
                  <tr key={payment.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FDF1F5]'}>
                    <td className="px-4 py-3 font-medium">
                      {payment.user?.first_name} {payment.user?.last_name}
                    </td>
                    <td className="px-4 py-3 uppercase text-xs font-bold text-blue-600">
                      {payment.payment_method || 'Stripe'}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-500 text-xs">
                      {payment.transaction_id || 'TXN_98231'}
                    </td>
                    <td className="px-4 py-3 font-bold">${payment.amount}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {payment.status || 'Completed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* User Subscriptions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: theme.color.primary }}>
          User Subscriptions
        </h2>
        {subsLoading ? (
          <SkeletonLoading count={3} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subscribersData?.data?.map((sub: any) => (
              <UserSubscriptionCard key={sub.id} sub={sub} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

// --- Plan Edit Modal ---
function PlanEditModal({ plan, onSave }: { plan: any; onSave: (data: any) => void }) {
  const [form, setForm] = useState({ ...plan })
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-400 hover:text-sky-500 p-1">
          <Icon name="edit" size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl!">
        <DialogHeader>
          <DialogTitle className="text-gray-800!">Edit Plan: {plan.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">Price ($)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 text-sm"
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Plan Active</span>
            <ToggleSwitch
              on={!!form.is_active}
              color="blue"
              onClick={() => setForm({ ...form, is_active: !form.is_active })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm border rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(form)
              setOpen(false)
            }}
            className="px-4 py-2 text-sm bg-pink-500 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- Updated User Subscription Card ---
function UserSubscriptionCard({ sub }: { sub: any }) {
  return (
    <Card className="relative flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEE3ED]/60">
          <Icon name="subscription-box" size={24} primary />
        </span>
        <span
          className={`rounded-xl px-2 py-1 text-xs font-medium uppercase ${sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
        >
          {sub.status}
        </span>
      </div>
      <div>
        <p className="font-regular text-gray-900 text-sm md:text-lg">
          {sub.user?.first_name} {sub.user?.last_name}
        </p>
        <p className="text-sm md:text-lg font-regular text-sky-600 mt-0.5">{sub.plan?.name}</p>
      </div>
      <div className="mt-2 flex gap-10 text-[10px] text-gray-500 uppercase tracking-tighter">
        <div className="space-y-2 text-sm">
          <p className="font-regular text-red-500">STARTED:</p>
          <span>{sub.started_at ? new Date(sub.started_at).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-regular text-red-500">EXPIRES:</p>
          <span>{sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : 'N/A'}</span>
        </div>
      </div>
      {/* <div className="flex items-center justify-between mt-2 pt-2 border-t">
        <span className="text-xs text-gray-400">Auto Renew</span>
        <ToggleSwitch on={!!sub.auto_renew} color="pink" />
      </div> */}
    </Card>
  )
}

function ToggleSwitch({
  on,
  color,
  onClick,
}: {
  on: boolean
  color: 'blue' | 'pink'
  onClick?: () => void
}) {
  const bg = on ? (color === 'blue' ? 'bg-blue-500' : 'bg-[var(--color-primary)]') : 'bg-gray-300'
  return (
    <button
      type="button"
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${bg}`}
      onClick={onClick}
    >
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
