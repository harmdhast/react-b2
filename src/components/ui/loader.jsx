import * as React from "react"

import { cn } from "@/lib/utils"

const Loader = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
        <div
            className={cn("flex items-center justify-center h-full grow", className)}
            ref={ref}
            {...props}>
            <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-800 dark:bg-zinc-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-slate-800 dark:bg-zinc-100"></span>
            </span>
        </div >
    );
})

export { Loader }
