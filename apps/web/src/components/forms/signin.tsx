"use client"
import { FcGoogle, FcKey } from 'react-icons/fc';
import { Button } from '../ui/button';
import { KeyRound } from 'lucide-react';
import { signIn } from 'next-auth/react';

const LOGIN_REDIRECT_PATH = '/documents';

export const SignInForm = () => {
  const onSignInWithGoogleClick = async () => {
    try {
      await signIn('google', { callbackUrl: LOGIN_REDIRECT_PATH });
    } catch (err) {
        console.log("Error signing in with Google", err);
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
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Google
    </Button>
    <Button
        type="button"
        size="lg"
        variant="outline"
        className="bg-background text-muted-foreground border"
        // onClick={onSignInWithKey}
    >   
      <KeyRound className="mr-2 h-5 w-5" />
        Passkey
    </Button>
    </div>
  );
};