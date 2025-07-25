import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-secondary bg-primary-foreground">
      <nav className="mx-auto max-w-4xl px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-card-foreground hover:text-primary"
        >
          Tech Blog
        </Link>
      </nav>
    </header>
  );
}
