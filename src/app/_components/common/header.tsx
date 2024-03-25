import { getServerAuthSession } from "@/server/auth"
import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"
import { UploadFiles } from "../upload-files"

const Header: FC = async () => {
  const session = await getServerAuthSession()

  return (
    <header className="w-full flex justify-between px-4  items-center h-20">
      <UploadFiles />
      {session ? (
        <Link href="/api/auth/signout">
          <button className="relative h-14 w-14 rounded-full">
            <Image
              sizes="32"
              priority
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
