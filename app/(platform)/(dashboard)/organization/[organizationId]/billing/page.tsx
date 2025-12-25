import { checkSubscription } from '@/lib/subscription';
import Info from '../_components/Info';
import { Separator } from '@/components/ui/separator';
import SubscribtionButton from './_components/SubscribtionButton';

const BillingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <SubscribtionButton isPro={isPro} />
    </div>
  );
};
export default BillingPage;
