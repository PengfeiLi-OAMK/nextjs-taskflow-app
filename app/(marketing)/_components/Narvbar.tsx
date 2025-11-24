import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full p-4 border-b shadow-sm bg-white ">
      <div className="md:max-w-screen-2xl mx-auto flex w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex w-full items-center justify-between">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get TaskFlow for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
