// Tremor Toaster [v0.0.0]

import { Toast, ToastProvider, ToastViewport } from '@web/components/ui/Toast';
import { useToast } from '@web/hocs/useToast';

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, ...props }) => {
        return <Toast key={id} {...props} />;
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export { Toaster };
