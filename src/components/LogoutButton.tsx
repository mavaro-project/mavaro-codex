import { Button } from "./Button";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  return (
    <form action="/auth/logout" method="post">
      <Button type="submit" variant="ghost" className={compact ? "px-3 py-2" : ""}>
        Sign out
      </Button>
    </form>
  );
}
