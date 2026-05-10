import { Logo } from './icons';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary-foreground" />
          <span className="font-headline text-2xl font-semibold tracking-tight text-primary-foreground">
            Global Wellness Guide
          </span>
        </Link>
      </div>
    </header>
  );
}
