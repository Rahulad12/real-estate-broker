import { cn } from "./utils";

const inputCls = (hasError: boolean, extra?: string) =>
  cn(
    "w-full pl-10 pr-4 py-3  border rounded-sm",
    "text-sm text-zinc-800 placeholder:text-zinc-600 font-light",
    "outline-none transition-all duration-200",
    hasError
      ? "border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
      : "border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/20",
    extra,
  );

export default inputCls;
