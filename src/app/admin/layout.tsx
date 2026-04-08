import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/admin/Sidebar'
import Topbar from '@/components/admin/Topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-navy text-white">
        <Sidebar />
        <div className="ml-64">
          <Topbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}
