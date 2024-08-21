import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-text dark:bg-slate-800", className)}
      {...props} />)
  );
}

export { Skeleton }