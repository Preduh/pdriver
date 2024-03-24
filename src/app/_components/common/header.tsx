import { getServerAuthSession } from "@/server/auth"
import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"

const Header: FC = async () => {
  const session = await getServerAuthSession()

  return (
    <header className="w-full flex justify-end p-4">
      {session ? (
        <Link href="/api/auth/signout">
          <button className="relative h-20 w-20 rounded-full">
            <Image
              className="rounded-full"
              fill
              src={session.user.image ?? ""}
              alt="User image"
            />
          </button>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <button className="btn btn-primary">Sign in</button>
        </Link>
      )}
    </header>
  )
}

export { Header }
