"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Button } from "@/app/components/ui/button"
import {
  LayoutDashboard,
  Wrench,
  Users,
  Package,
  Settings,
  LogOut,
  Smartphone,
  FileText,
  ShoppingCart
} from "lucide-react"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session && pathname !== "/admin/login") {
    router.push("/admin/login")
    return null
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const navigation = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Réparations", href: "/admin/repairs", icon: Wrench },
    { name: "Clients", href: "/admin/customers", icon: Users },
    { name: "Pièces", href: "/admin/parts", icon: Package },
    { name: "Appareils", href: "/admin/devices", icon: Smartphone },
    { name: "Fournisseurs", href: "/admin/suppliers", icon: ShoppingCart },
    { name: "Factures", href: "/admin/invoices", icon: FileText },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}
