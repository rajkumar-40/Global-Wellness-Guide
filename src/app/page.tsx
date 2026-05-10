
'use client';

import { useState, useRef, use } from 'react';
import type { z } from 'zod';
import {
  IntakeForm,
  type IntakeFormSchema,
  STORAGE_KEY,
} from '@/components/intake-form';
import { RecoveryPlanDisplay } from '@/components/recovery-plan-display';
import { generatePlanAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/loading-spinner';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

type PageProps = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Home(props: PageProps) {
  // Properly unwrap params and searchParams for Next.js 15 compatibility
  use(props.params);
  use(props.searchParams);

  const [recoveryPlan, setRecoveryPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  const handleFormSubmit = async (data: z.infer<typeof IntakeFormSchema>) => {
    setIsLoading(true);
    setRecoveryPlan(null);
    try {
      const plan = await generatePlanAction(data);
      if (plan) {
        setRecoveryPlan(plan);
        localStorage.removeItem(STORAGE_KEY);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } catch (error) {
      console.error('Submission error detail:', error);
      const description =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please check your connection.";
      
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setRecoveryPlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12 md:mb-16">
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl shadow-primary/20 mb-8">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-foreground">
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-full mb-4 shadow-lg">
              <Logo className="h-16 w-16 text-primary-foreground" />
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Global Wellness Guide
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl">
              Your personalized, AI-powered path to holistic well-being.
            </p>
          </div>
        </div>
      </section>

      <Card className="max-w-4xl mx-auto p-6 md:p-10 shadow-lg bg-card/80 backdrop-blur-sm rounded-2xl border-primary/20">
        {!recoveryPlan ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="font-headline text-3xl font-semibold text-primary-foreground">
                Create Your Wellness Plan
              </h2>
              <p className="text-muted-foreground mt-2">
                Tell us about your symptoms to generate a personalized educational analysis.
              </p>
            </div>
            <IntakeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="font-headline text-3xl font-semibold text-primary-foreground">
              Analysis Complete
            </h2>
            <p className="text-muted-foreground mt-2 mb-8">
              Your personalized plan is ready below. You can start a new analysis anytime.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleStartOver} variant="outline" size="lg">
                Start New Analysis
              </Button>
            </div>
          </div>
        )}
      </Card>

      {isLoading && (
        <div className="text-center mt-12 flex flex-col items-center">
          <LoadingSpinner size={64} className="text-primary-foreground" />
          <p className="mt-4 text-muted-foreground animate-pulse text-lg">
            Analyzing symptoms and crafting your wellness journey...
          </p>
        </div>
      )}

      <div ref={resultsRef} className="mt-12">
        {recoveryPlan && (
          <RecoveryPlanDisplay
            plan={recoveryPlan}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}
