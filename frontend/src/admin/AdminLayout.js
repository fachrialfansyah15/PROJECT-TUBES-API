import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, PlusSquare, ListChecks, BarChart2 } from 'lucide-react'
import { useAuth } from '../auth/AuthContext.js'

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const h = React.createElement

  return h(
    'div',
    { className: 'min-h-dvh grid grid-cols-[260px_1fr] bg-[var(--color-background)] text-[var(--color-foreground)]' },
    [
      h(
        'aside',
        { className: 'border-r border-[var(--color-border)] p-5' },
        [
          h('div', { className: 'mb-6 text-sm font-semibold text-[var(--color-muted)]' }, 'QUIZZZ APP - KELOMPOK 9'),
          h('nav', { className: 'grid gap-1' }, [
            h(NavLink, { to: '/admin', end: true, className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(LayoutDashboard, { size: 18 }), 'Dashboard']),
            h(NavLink, { to: '/admin/create', className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(PlusSquare, { size: 18 }), 'Buat Kuis']),
            h(NavLink, { to: '/admin/manage', className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(ListChecks, { size: 18 }), 'Kelola Kuis']),
            h(NavLink, { to: '/admin/results', className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(BarChart2, { size: 18 }), 'Hasil User']),
          ]),
        ]
      ),
      h(
        'div',
        { className: 'grid grid-rows-[56px_1fr]' },
        [
          h(
            'header',
            { className: 'flex items-center justify-between border-b border-[var(--color-border)] px-6' },
            [
              h('div'),
              h('button', { onClick: () => { logout(); navigate('/login', { replace: true }) }, className: 'rounded-lg border border-[var(--color-border)] bg-white px-3 py-1 text-sm' }, 'Logout'),
            ]
          ),
          h('main', { className: 'p-6' }, h(Outlet)),
        ]
      ),
    ]
  )
}


