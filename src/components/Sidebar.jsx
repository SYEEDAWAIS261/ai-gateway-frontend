import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Key, BookOpen, Home } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Docs & Integration', href: '/docs', icon: BookOpen },
    { name: 'Home Portal', href: '/', icon: Home },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/30 p-4 min-h-[calc(100vh-65px)]">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = router.pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-600/10 text-brand-500 border border-brand-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}