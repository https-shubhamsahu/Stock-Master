'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Boxes } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const signupSchema = z
  .object({
    email: z.string().email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be more than 8 characters.')
      .regex(/[a-z]/, 'Password must contain a small case letter.')
      .regex(/[A-Z]/, 'Password must contain a large case letter.')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character.'),
    reenterPassword: z.string(),
  })
  .refine((data) => data.password === data.reenterPassword, {
    message: "Passwords don't match",
    path: ['reenterPassword'],
  });

export default function SignupPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse({ email, password, reenterPassword });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach(err => {
        if(err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
       let errorMessage = error.message;
       if (error.code === 'auth/email-already-in-use') {
           errorMessage = 'This email address is already in use by another account.';
       }
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: errorMessage,
      });
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-primary/10 flex-col p-8 text-center">
        <Boxes className="h-24 w-24 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">
          StockMaster
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Join us and streamline your inventory management.
        </p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Create an Account</h1>
          </div>
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reenterPassword">Re-Enter Password</Label>
              <Input
                id="reenterPassword"
                type="password"
                required
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
              />
              {errors.reenterPassword && <p className="text-sm text-destructive">{errors.reenterPassword}</p>}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
