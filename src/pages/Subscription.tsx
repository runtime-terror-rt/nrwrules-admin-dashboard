/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
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
import {
  useGetPaymentsQuery,
  useGetPlansQuery,
  useGetSubscribersQuery,
  useUpdatePlanMutation,
  useTogglePlanStatusMutation,
} from '@/redux/features/api/admin/subscription'
import { toast } from 'sonner'

export function Subscription() {
  const { data: plansData, isLoading: plansLoading } = useGetPlansQuery(undefined)
  const { data: subscribersData, isLoading: subsLoading } = useGetSubscribersQuery(undefined)
  const { data: paymentsData, isLoading: paymentsLoading } = useGetPaymentsQuery(undefined)
  const [updatePlan] = useUpdatePlanMutation()
  const [togglePlanStatus] = useTogglePlanStatusMutation()

  const handleSavePlan = async (data: any) => {
    try {
      const res = await updatePlan(data).unwrap()
      toast.success(res?.message || 'Plan updated successfully')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update plan')
    }
  }

  const handleToggleStatus = async (id: number | string) => {
    try {
      const res = await togglePlanStatus(id).unwrap()
      toast.success(res?.message || 'Status updated successfully')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to toggle status')
    }
  }

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold" style={{ color: theme.color.primary }}>
            Existing Subscription Plans
          </h2>
          <PlanEditModal onSave={handleSavePlan} />
        </div>
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
                    onSave={handleSavePlan}
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-2xl font-bold text-sky-600">
                    ${plan.price}{' '}
                    <span className="text-xs text-gray-400 uppercase font-normal">
                      / {plan.billing_cycle}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-100 text-sky-700 rounded-full uppercase">
                    {plan.plan_type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{plan.description}</p>
                {plan.features && plan.features.length > 0 && (
                  <ul className="mb-4 space-y-1">
                    {plan.features.slice(0, 3).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="h-1 w-1 rounded-full bg-gray-400" />
                        {feature}
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-xs text-gray-400 italic">
                        +{plan.features.length - 3} more features...
                      </li>
                    )}
                  </ul>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${plan.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {plan.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <ToggleSwitch
                    on={!!plan.is_active}
                    color="pink"
                    onClick={() => handleToggleStatus(plan.id)}
                  />
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
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-pink-100 scrollbar-track-transparent">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead>
                <tr className="bg-[#FEE3ED]">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap">User</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap">Method</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap">Transaction ID</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap">Amount</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-black!">
                {paymentsLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8">
                      <SkeletonLoading count={1} direction="horizontal" height="h-10" />
                    </td>
                  </tr>
                ) : paymentsData?.data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-400 font-medium">No payments found</td>
                  </tr>
                ) : (
                  paymentsData?.data?.map((payment: any, i: number) => (
                    <tr key={payment.id} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDF1F5]/30'}`}>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                        {payment.user?.first_name} {payment.user?.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-sky-50 text-sky-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-sky-100">
                          {payment.payment_method || 'Stripe'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-400 text-[11px]">
                        {payment.invoice || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">${payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 border border-green-200">
                          {payment.status || 'Completed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                        {payment.issued_at ? new Date(payment.issued_at).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
function PlanEditModal({ plan, onSave }: { plan?: any; onSave: (data: any) => void }) {
  const [form, setForm] = useState({
    name: '',
    price: 0,
    description: '',
    features: '',
    billing_cycle: 'monthly',
    plan_type: 'premium',
    is_active: 1,
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      if (plan) {
        setForm({
          ...plan,
          features: plan.features ? plan.features.join('\n') : '',
          is_active: plan.is_active ? 1 : 0,
        })
      } else {
        setForm({
          name: '',
          price: 0,
          description: '',
          features: '',
          billing_cycle: 'monthly',
          plan_type: 'premium',
          is_active: 1,
        })
      }
    }
  }, [open, plan])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {plan ? (
          <button className="text-gray-400 hover:text-sky-500 p-1">
            <Icon name="edit" size={18} />
          </button>
        ) : (
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
            + Add New Plan
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-xl!">
        <DialogHeader>
          <DialogTitle className="text-gray-800!">
            {plan ? `Edit Plan: ${plan.name}` : 'Create New Plan'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">Plan Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 text-sm text-gray-800!"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-gray-500">Price ($)</label>
              <input
                type="number"
                value={form.price === 0 ? '' : form.price}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm({ ...form, price: val === '' ? 0 : Number(val) });
                }}
                className="w-full border rounded-lg p-2 mt-1 text-sm text-gray-800!"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-500">Billing Cycle</label>
              <select
                value={form.billing_cycle}
                onChange={(e) => setForm({ ...form, billing_cycle: e.target.value })}
                className="w-full border rounded-lg p-2 mt-1 text-sm text-gray-800!"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">Plan Type</label>
            <input
              type="text"
              value={form.plan_type}
              onChange={(e) => setForm({ ...form, plan_type: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 text-sm text-gray-800!"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 text-sm text-gray-800!"
              rows={3}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Features (one per line)
            </label>
            <textarea
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 text-sm"
              rows={5}
              placeholder="Enter features, one per line..."
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Plan Active</span>
            <ToggleSwitch
              on={form.is_active === 1}
              color="pink"
              onClick={() => setForm({ ...form, is_active: form.is_active === 1 ? 0 : 1 })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm border rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              const cleanedFeatures = form.features
                .split('\n')
                .map((f: string) => f.trim())
                .filter((f: string) => f.length > 0)
              
              const payload: any = {
                name: form.name,
                price: Number(form.price),
                description: form.description,
                billing_cycle: form.billing_cycle,
                plan_type: form.plan_type,
                is_active: typeof form.is_active === 'boolean' ? (form.is_active ? 1 : 0) : form.is_active,
                features: cleanedFeatures,
              }

              if (plan?.id !== undefined) {
                payload.id = plan.id
              }

              onSave(payload)
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
  const bg = on ? (color === 'blue' ? 'bg-blue-500' : 'bg-[#FD307F]') : 'bg-gray-300'
  return (
    <button
      type="button"
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${bg}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
