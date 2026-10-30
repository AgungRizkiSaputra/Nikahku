'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types';
import { Shield, Sparkles, User, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function RoleSwitcherBar() {
  const { user, role, switchRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      role: 'guest',
      label: 'Guest',
      icon: <User className="w-3.5 h-3.5" />,
      desc: 'Mode pengunjung publik',
    },
    {
      role: 'customer',
      label: 'Customer',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: 'Mode pengantin (buat dan kelola undangan)',
    },
    {
      role: 'admin',
      label: 'Admin',
      icon: <Shield className="w-3.5 h-3.5" />,
      desc: 'Mode admin platform',
    },
  ];

  return (
    <div className="bg-[#181B19] text-[#FAF7F2] px-4 py-2 text-xs z-50 sticky top-0 transition-opacity">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Role Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-stone-400">Hak akses simulasi:</span>
          <span className="font-semibold text-white px-2 py-0.5 rounded bg-stone-800">
            {role}
          </span>
          {user && (
            <span className="text-stone-400 text-xs hidden md:inline">
              ({user.full_name})
            </span>
          )}
        </div>

        {/* Center: Switcher Buttons */}
        {!collapsed && (
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 text-xs hidden lg:inline mr-1">Ganti peran:</span>
            {roles.map((item) => {
              const isActive = role === item.role;
              return (
                <button
                  key={item.role}
                  onClick={() => switchRole(item.role)}
                  title={item.desc}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium cursor-pointer ${
                    isActive
                      ? 'bg-[#947141] text-white font-bold'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Right: Quick shortcuts */}
        <div className="flex items-center gap-3">
          {role === 'admin' ? (
            <Link
              href="/admin"
              className="text-[#D4AF37] hover:underline flex items-center gap-1 text-xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
          ) : role === 'customer' ? (
            <Link
              href="/dashboard"
              className="text-[#D4AF37] hover:underline flex items-center gap-1 text-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Dashboard Saya</span>
            </Link>
          ) : (
            <span className="text-stone-400 text-xs">Katalog Terbuka</span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
            title={collapsed ? 'Tampilkan Selector' : 'Kecilkan Bar'}
          >
            {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
