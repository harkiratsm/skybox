"use client"
import { FcGoogle, FcKey } from 'react-icons/fc';
import { Button } from '../ui/button';
import { KeyRound } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { browserSupportsWebAuthn } from '@simplewebauthn/browser';
import { useToast } from '@/hooks/use-toast';
const LOGIN_REDIRECT_PATH = '/';

export const SignInForm = () => {

  const {toast} = useToast();


  const onSignInWithGoogleClick = async () => {
    try {
      await signIn('google', { callbackUrl: LOGIN_REDIRECT_PATH });
    } catch (err) {
        console.log("Error signing in with Google", err);
    }
  };

  const onSignInWithKey = async () => {
    if (!browserSupportsWebAuthn()) {
      toast({
        description : "Your browser does not support WebAuthn",
        duration: 5000,
        variant: 'destructive'
      })
      return 
    }
    try {
      const res = await signIn('passkey', { callbackUrl: LOGIN_REDIRECT_PATH });

    } catch (err) {
        console.log("Error signing in with Key", err);
    }
  }

  return (
    <div className='flex w-full flex-col gap-y-4'>
    <Button
      type="button"
      size="lg"
      variant="outline"
      className="bg-background text-muted-foreground border"
      onClick={onSignInWithGoogleClick}
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
    >   
      <KeyRound className="mr-2 h-5 w-5" />
        Passkey
    </Button>
    {!false ? (
        <button onClick={() => signIn("passkey", { action: "register" })}>
          Register new Passkey
        </button>
      ) :
        <button onClick={() => signIn("passkey")}>Sign in with Passkey</button>
}
  
    </div>
  );
};