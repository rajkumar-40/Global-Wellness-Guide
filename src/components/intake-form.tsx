'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Leaf, User, Bot, HeartPulse } from 'lucide-react';
import { LoadingSpinner } from './loading-spinner';

export const STORAGE_KEY = 'intakeFormHistory';

export const IntakeFormSchema = z.object({
  symptoms: z
    .string()
    .min(10, 'Please describe your symptoms in at least 10 characters.')
    .max(500, 'Symptoms description cannot exceed 500 characters.'),
  age: z.coerce
    .number()
    .min(1, 'Age must be at least 1.')
    .max(120, 'Age must be at most 120.'),
  gender: z.enum(['male', 'female', 'other']),
});

type IntakeFormProps = {
  onSubmit: (data: z.infer<typeof IntakeFormSchema>) => void;
  isLoading: boolean;
};

export function IntakeForm({ onSubmit, isLoading }: IntakeFormProps) {
  const form = useForm<z.infer<typeof IntakeFormSchema>>({
    resolver: zodResolver(IntakeFormSchema),
    defaultValues: {
      symptoms: '',
      age: 30,
      gender: 'other',
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    try {
      const dataToStore = JSON.stringify(watchedValues);
      localStorage.setItem(STORAGE_KEY, dataToStore);
    } catch (error) {
      console.error('Could not save form history to localStorage:', error);
    }
  }, [watchedValues]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const validKeys = Object.keys(IntakeFormSchema.shape);
        Object.keys(parsedData).forEach(key => {
          if (validKeys.includes(key)) {
            form.setValue(
              key as keyof z.infer<typeof IntakeFormSchema>,
              parsedData[key]
            );
          }
        });
      }
    } catch (error) {
      console.error('Could not load form history from localStorage:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg font-headline text-primary-foreground">
                <Leaf className="text-accent" /> Symptoms
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Put your symptoms in your language..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Our AI understands all languages. Describe your symptoms in the
                language you are most comfortable with.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg font-headline text-primary-foreground">
                  <User className="text-accent" /> Age
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Your age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg font-headline text-primary-foreground">
                  <HeartPulse className="text-accent" /> Gender
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">
                      Other / Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Generating Plan...
              </>
            ) : (
              <>
                <Bot className="mr-2" />
                Generate My Wellness Plan
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
