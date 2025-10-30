import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Autoriser l'accès à /admin/login sans authentification
      if (req.nextUrl.pathname === "/admin/login") {
        return true
      }
      // Pour toutes les autres routes /admin, vérifier le token
      return !!token
    },
  },
})

export const config = {
  matcher: ["/admin/:path*"],
}
