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
        { key: 'sidebar', className: 'border-r border-[var(--color-border)] p-5' },
        [
          h('div', { key: 'app-title', className: 'mb-6 text-sm font-semibold text-[var(--color-muted)]' }, 'QUIZZZ APP - KELOMPOK 9'),
          h('nav', { key: 'navigation', className: 'grid gap-1' }, [
            h(NavLink, { key: 'dashboard', to: '/admin', end: true, className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(LayoutDashboard, { key: 'dashboard-icon', size: 18 }), 'Dashboard']),
            h(NavLink, { key: 'create', to: '/admin/create', className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(PlusSquare, { key: 'create-icon', size: 18 }), 'Buat Kuis']),
            h(NavLink, { key: 'manage', to: '/admin/manage', className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(ListChecks, { key: 'manage-icon', size: 18 }), 'Kelola Kuis']),
            h(NavLink, { key: 'results', to: '/admin/results', className: ({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 ' + (isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white') }, [h(BarChart2, { key: 'results-icon', size: 18 }), 'Hasil User']),
          ]),
        ]
      ),
      h(
        'div',
        { key: 'main-content', className: 'grid grid-rows-[56px_1fr]' },
        [
          h(
            'header',
            { key: 'header', className: 'flex items-center justify-between border-b border-[var(--color-border)] px-6' },
            [
              h('div', { key: 'spacer' }),
              h('button', { key: 'logout-btn', onClick: () => { logout(); navigate('/login', { replace: true }) }, className: 'rounded-lg border border-[var(--color-border)] bg-white px-3 py-1 text-sm' }, 'Logout'),
            ]
          ),
          h('main', { key: 'main', className: 'p-6' }, h(Outlet)),
        ]
      ),
    ]
  )
}


