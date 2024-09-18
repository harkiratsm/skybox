'use client'
import { useToast } from '@/hooks/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import { browserSupportsWebAuthn } from '@simplewebauthn/browser';
import { KeyRound } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { signIn as webauthn } from 'next-auth/webauthn';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

const LOGIN_REDIRECT_PATH = '/';

export const SignInForm = () => {
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onSignInWithGoogleClick = async () => {
    try {
      await signIn('google', { callbackUrl: LOGIN_REDIRECT_PATH });
    } catch (err) {
      console.log("Error signing in with Google", err);
      toast({
        description: "Failed to sign in with Google",
        duration: 5000,
        variant: 'destructive'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onSignInWithKey = async () => {
    if (!browserSupportsWebAuthn()) {
      toast({
        description: "Your browser does not support WebAuthn",
        duration: 5000,
        variant: 'destructive'
      });
      return;
    }
    setIsLoggingIn(true);
    try {
      await webauthn('passkey', { callbackUrl: LOGIN_REDIRECT_PATH });
    } catch (err) {
      console.log("Error signing in with Key", err);
      toast({
        description: "Failed to sign in with Passkey",
        duration: 5000,
        variant: 'destructive'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className='flex w-full flex-col gap-y-4'>
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="bg-background text-muted-foreground border"
        onClick={onSignInWithGoogleClick}
        disabled={isLoggingIn}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Google
      </Button>
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="bg-background text-muted-foreground border"
        onClick={onSignInWithKey}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? (
          <ReloadIcon className='mr-2 h-5 w-5 animate-spin' />
        ) : (
          <KeyRound className="mr-2 h-5 w-5" />
        )}
        Passkey
      </Button>
    </div>
  );
};