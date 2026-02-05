import { memo } from 'react'
import { theme } from '../constants'
import type { User } from '../types'
import { Button, Icon } from './ui'
import CommonDeleteModal from './modal/CommonDeleteModal'

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
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-pink-100 scrollbar-track-transparent">
        <table className="w-full min-w-[800px] text-left text-[11px] md:text-sm border-collapse">
          <thead>
            <tr>
              <th
                className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                style={tableHeaderStyle}
              >
                User Name
              </th>
              <th
                className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                style={tableHeaderStyle}
              >
                Email
              </th>
              <th
                className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap text-center"
                style={tableHeaderStyle}
              >
                Status
              </th>
              <th
                className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                style={tableHeaderStyle}
              >
                Current Phase
              </th>
              <th
                className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                style={tableHeaderStyle}
              >
                Delivery Type
              </th>
              <th
                className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                style={tableHeaderStyle}
              >
                Last Activity
              </th>
              <th
                className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap text-right"
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
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.email}</td>
      <td className="px-4 py-3 text-center whitespace-nowrap">
        {user.status === 'active' ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-green-700">
            <Icon name="check" size={12} />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-red-700">
            <Icon name="x" size={12} />
            Deactivate
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.phase}</td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.delivery}</td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.lastActivity}</td>
      <td
        className="px-4 py-3 text-right whitespace-nowrap"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CommonDeleteModal
          onConfirm={() => toggleUserStatus?.(user)}
          title="Are you sure you want to deactivate this user?"
          btnText={user.status === 'active' ? 'Deactivate' : 'Active'}
        >
          <Button variant={user.status === 'active' ? 'danger' : 'success'} size="sm" type="button" className="text-[10px] font-bold uppercase tracking-wider">
            {user.status === 'active' ? 'Deactivate' : 'Active'}
          </Button>
        </CommonDeleteModal>
      </td>
    </tr>
  )
})

export const UserDirectoryTable = memo(UserDirectoryTableComponent)
