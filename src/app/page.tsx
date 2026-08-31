'use client';

import { useState, useRef, use, useEffect } from 'react';
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
  // Next.js 15 सुसंगततेसाठी अनव्रॅप करा
  use(props.params);
  use(props.searchParams);

  const [recoveryPlan, setRecoveryPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  // PWA Install Prompt स्टेट्स
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    // 1. PWA सर्व्हिस वर्कर नोंदणी
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('Service Worker registration failed: ', err);
      });
    }

    // 2. Install Prompt इव्हेंट कॅप्चर करणे
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('युझरने ॲप इंस्टॉल स्वीकारले.');
        }
        setDeferredPrompt(null);
        setShowInstallBtn(false);
      });
    }
  };

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
      {/* 📲 PWA ॲप इंस्टॉल बटण (मोबाईल/ब्राऊझरवर सपोर्ट असल्यास दिसेल) */}
      {showInstallBtn && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-emerald-50 border border-emerald-500 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div className="text-center md:text-left">
            <p className="font-semibold text-emerald-900">
              📲 Global Wellness Guide ॲप मोबाईलमध्ये इंस्टॉल करा
            </p>
            <p className="text-xs text-emerald-700">
              ऑफलाईन किंवा जलद वापरासाठी होम स्क्रीनवर जोडा.
            </p>
          </div>
          <Button 
            onClick={handleInstallClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            Install App
          </Button>
        </div>
      )}

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
