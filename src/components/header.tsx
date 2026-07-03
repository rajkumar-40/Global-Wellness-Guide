import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-ganpati-saraswati.png"
            alt="Ganpati Bappa and Saraswati Mata logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="font-headline text-2xl font-semibold tracking-tight text-primary-foreground">
            Global Wellness Guide
          </span>
        </Link>
      </div>
    </header>
  );
}
