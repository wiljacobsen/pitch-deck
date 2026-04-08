'use client'

import { signOut, useSession } from 'next-auth/react'

export default function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-14 bg-navy-light border-b border-white/10 flex items-center justify-end px-6 gap-4">
      {session?.user && (
        <>
          <span className="text-sm text-gray-400">
            {session.user.name || session.user.email}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            {session.user.role}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Logout
          </button>
        </>
      )}
    </header>
  )
}
