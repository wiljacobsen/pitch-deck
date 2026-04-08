'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { createUser, deleteUser } from '@/app/admin/users/actions'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  email: string
  name: string | null
  role: 'ADMIN' | 'VIEWER'
  createdAt: Date | string
}

export default function UsersManager({ initialUsers }: { initialUsers: UserData[] }) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState<'ADMIN' | 'VIEWER'>('VIEWER')
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    if (!newEmail || !newPassword) return
    setCreating(true)
    try {
      await createUser({ email: newEmail, name: newName, password: newPassword, role: newRole })
      setShowModal(false)
      setNewEmail('')
      setNewName('')
      setNewPassword('')
      setNewRole('VIEWER')
      router.refresh()
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this user?')) return
    await deleteUser(id)
    router.refresh()
  }

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setShowModal(true)}>+ Add User</Button>
      </div>

      <div className="bg-navy-light rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {initialUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-3 px-4 text-white">{user.name || '—'}</td>
                <td className="py-3 px-4 text-gray-400">{user.email}</td>
                <td className="py-3 px-4"><Badge label={user.role} /></td>
                <td className="py-3 px-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-xs text-gray-600 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add User">
        <div className="space-y-4">
          <Input label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Full name" />
          <Input label="Email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="email@example.com" />
          <Input label="Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Password" />
          <Select
            label="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as 'ADMIN' | 'VIEWER')}
            options={[
              { value: 'VIEWER', label: 'Viewer' },
              { value: 'ADMIN', label: 'Admin' },
            ]}
          />
          <Button onClick={handleCreate} disabled={creating || !newEmail || !newPassword}>
            {creating ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
