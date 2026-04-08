export const dynamic = 'force-dynamic'

import { getUsers } from './actions'
import UsersManager from '@/components/admin/UsersManager'

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Users</h1>
      <UsersManager initialUsers={users} />
    </div>
  )
}
