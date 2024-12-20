import {
  CodeResponse,
  GoogleOAuthProvider,
  useGoogleLogin
} from '@react-oauth/google';
import { trpc } from '@web/api';
import { GoogleIcon } from '@web/components/ui/icons';
import { GOOGLE_CLIENT_ID } from '@web/config';
import { UserContext, UserContextType } from '@web/contexts/User';
import { toast } from '@web/hocs/useToast';
import { cx } from '@web/utility';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

type SingInButtonGoogleProps = {
  className?: string;
};

const SingInButtonGoogle = ({ className }: SingInButtonGoogleProps) => {
  const { login }: UserContextType = useContext(UserContext);
  const { t } = useTranslation();

  const googleAuthMutation = trpc.googleAuth.useMutation();
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    scope: [
      'email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' '),
    onSuccess: async (
      codeResponse: Omit<
        CodeResponse,
        'error' | 'error_description' | 'error_uri'
      >
    ) => {
      const { code } = codeResponse;
      try {
        const jwt = await googleAuthMutation.mutateAsync({
          code
        });

        login(jwt);
        toast({
          title: t('toast.success'),
          description: t('signIn.toast.success'),
          variant: 'success',
          duration: 5000
        });
      } catch (error) {
        const errorData = error as { message: string };
        toast({
          title: t('toast.error'),
          description: errorData.message ?? t('signIn.toast.failed'),
          variant: 'error',
          duration: 5000
        });
      }

      return true;
    }
  });
  return (
    <div
      className={cx(
        'text-sm flex items-center py-3 px-5 justify-center p-2 border rounded-md cursor-pointer',
        className
      )}
      onClick={() => googleLogin()}
    >
      <div className="mr-3">
        <GoogleIcon width={18} height={18} />
      </div>
      <div>{t('signIn.googleOauth.button')}</div>
    </div>
  );
};

export const GoogleOauth = (props: SingInButtonGoogleProps) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <SingInButtonGoogle {...props} />
    </GoogleOAuthProvider>
  );
};
