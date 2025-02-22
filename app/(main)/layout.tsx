'use client'

import Navigation from "@/components/Navigation"
import { SearchCommand } from "@/components/SearchCommand"
import Spinner from "@/components/ui/spinner"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

const MainLayout = ({
    children
} : {
    children: ReactNode
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth()

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size='lg' />
            </div>
        )
    }

    if (!isAuthenticated) {
        return redirect("/")
    }

    return (
        <div className="h-full flex dark:bg-[1f1f1f]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                {children}
            </main>
        </div>
    )
}

export default MainLayout