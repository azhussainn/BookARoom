import { withAuth } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'
 

export default withAuth(
  function middleware(req: NextRequest){
  }
)
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me/:path*'],
}