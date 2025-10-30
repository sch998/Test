"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/app/components/ui/button"
import {
  LayoutDashboard,
  Wrench,
  LogOut,
  Smartphone,
} from "lucide-react"

type Session = {
  user: {
    email?: string | null
    name?: string | null
  }
}

export default function AdminNav({ session }: { session: Session }) {
  const pathname = usePathname()

  const navigation = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Réparations", href: "/admin/repairs", icon: Wrench },
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
      <div className="flex items-center gap-2 p-6 border-b border-gray-800">
        <Smartphone className="h-8 w-8" />
        <span className="text-xl font-bold">Admin</span>
      </div>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="mb-3 px-4">
          <p className="text-sm text-gray-400">Connecté en tant que</p>
          <p className="font-semibold truncate">{session?.user?.email}</p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}
