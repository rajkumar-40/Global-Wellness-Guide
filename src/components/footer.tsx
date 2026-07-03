
import Image from 'next/image';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Separator } from './ui/separator';
import { CurrentYear } from './current-year';

export function Footer() {
  return (
    <footer className="bg-card/50 mt-16 border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-ganpati-saraswati.png"
              alt="Ganpati Bappa and Saraswati Mata logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-headline text-xl font-semibold text-primary-foreground">
              Global Wellness Guide
            </span>
          </div>
          <div className="text-center text-muted-foreground">
            <p>
              Support our mission to provide accessible wellness information.
            </p>
            <p className="font-semibold">Donate via UPI: +91 7757017131</p>
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-primary-foreground transition-colors"
            >
              <Twitter />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary-foreground transition-colors"
            >
              <Github />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary-foreground transition-colors"
            >
              <Linkedin />
            </a>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; <CurrentYear /> Global Wellness Guide. All Rights Reserved.
          </p>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50 max-w-4xl mx-auto italic">
            <p>
              <strong>Disclaimer:</strong> This website provides educational
              wellness information only and is NOT a substitute for professional
              medical advice, diagnosis, or treatment. Always consult a qualified
              clinician for health concerns.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
