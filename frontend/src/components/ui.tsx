import { } from "../lib/utils";


export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-white border rounded-2xl shadow-sm", className)} {...props} />;
}
export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 md:p-5", className)} {...props} />;
}

export function Button(
  { className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-50 active:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}

// className helper
export function cn(...parts: (string | undefined | null | false)[]) {
  return parts.filter(Boolean).join(" ");
}
