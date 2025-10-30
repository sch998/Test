import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminNav from "./components/AdminNav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Ne pas rediriger si on est sur la page de login
  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav session={session} />
      <div className="ml-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
