'use client';

import { stripeRedirect } from '@/actions/stripe-redirect';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'sonner';

interface SubscribtionButtonProps {
  isPro: boolean;
}

function SubscribtionButton({ isPro }: SubscribtionButtonProps) {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };

  return (
    <Button variant="primary" onClick={onClick} disabled={isLoading}>
      {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
    </Button>
  );
}

export default SubscribtionButton;
