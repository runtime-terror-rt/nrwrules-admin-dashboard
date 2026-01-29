import { memo } from 'react'
import { theme } from '../constants'
import type { User } from '../types'
import { Button, Icon } from './ui'

export interface UserDirectoryTableProps {
  users: User[]
  /** Click a member row to view details */
  onRowClick?: (user: User) => void
  toggleUserStatus?: (user: User) => void
}

/** Design system: table header uses activeNav (#FEE3ED) per DESIGN_SYSTEM_REVIEW */
const tableHeaderStyle = {
  backgroundColor: theme.color.tableHeader,
}

/**
 * User directory table: theme table header, alternating surface & sidebar row bg,
 * status pills with icons from /assets/icons.
 */
function UserDirectoryTableComponent({
  users,
  onRowClick,
  toggleUserStatus,
}: UserDirectoryTableProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
      style={{ boxShadow: theme.shadow.card }}
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-gray-800"
              style={tableHeaderStyle}
            >
              User Name
            </th>
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-gray-800"
              style={tableHeaderStyle}
            >
              Email
            </th>
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-gray-800"
              style={tableHeaderStyle}
            >
              Status
            </th>
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-gray-800"
              style={tableHeaderStyle}
            >
              Current Phase
            </th>
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-gray-800"
              style={tableHeaderStyle}
            >
              Delivery Type
            </th>
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-gray-800"
              style={tableHeaderStyle}
            >
              Last Activity
            </th>
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-gray-800"
              style={tableHeaderStyle}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <TableRow
              key={user.id ?? user.email}
              toggleUserStatus={toggleUserStatus}
              user={user}
              index={i}
              onRowClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface TableRowProps {
  user: User
  index: number
  onRowClick?: (user: User) => void
  toggleUserStatus?: (user: User) => void
}

/** Figma 3468-1203: alternating white & subtle light pink (page bg). Click row to view details. */
const TableRow = memo(function TableRow({
  user,
  index,
  onRowClick,
  toggleUserStatus,
}: TableRowProps) {
  const rowBg = index % 2 === 0 ? theme.color.surface : theme.color.pageBackground
  return (
    <tr
      style={{ backgroundColor: rowBg }}
      className={onRowClick ? 'cursor-pointer hover:opacity-95' : ''}
      onClick={() => onRowClick?.(user)}
    >
      <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
      <td className="px-4 py-3 text-gray-600">{user.email}</td>
      <td className="px-4 py-3">
        {user.status === 'active' ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
            <Icon name="check" size={12} />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
            <Icon name="x" size={12} />
            Deactivate
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-600">{user.phase}</td>
      <td className="px-4 py-3 text-gray-600">{user.delivery}</td>
      <td className="px-4 py-3 text-gray-600">{user.lastActivity}</td>
      <td
        className="px-4 py-3"
        onClick={(e) => {
          e.stopPropagation()
          toggleUserStatus?.(user)
        }}
      >
        <Button variant={user.status === 'active' ? 'danger' : 'success'} size="sm" type="button">
          {user.status === 'active' ? 'Deactivate' : 'Active'}
        </Button>
      </td>
    </tr>
  )
})

export const UserDirectoryTable = memo(UserDirectoryTableComponent)
