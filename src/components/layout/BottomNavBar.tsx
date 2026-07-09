import { Link } from '@/libs/I18nNavigation';

export const BottomNavBar = () => (
  <nav className="border-border-subtle fixed bottom-0 z-50 w-full rounded-t-xl border-t bg-surface-container-lowest shadow-sm md:hidden">
    <div className="pb-safe mx-auto flex h-20 w-full max-w-container-max items-center justify-around px-4">
      <Link
        href="/"
        className="flex flex-col items-center justify-center rounded-full bg-primary-fixed px-4 py-1 text-primary transition-all"
      >
        <span
          className="material-symbols-outlined"
          data-icon="home"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          home
        </span>
        <span className="font-label-md text-label-md mt-0.5">Home</span>
      </Link>
      <Link
        href="/products"
        className="flex flex-col items-center justify-center text-on-surface-variant transition-colors duration-200 hover:text-primary active:scale-90"
      >
        <span className="material-symbols-outlined" data-icon="storefront">
          storefront
        </span>
        <span className="font-label-md text-label-md mt-0.5">Shop</span>
      </Link>
      <Link
        href="/cart"
        className="flex flex-col items-center justify-center text-on-surface-variant transition-colors duration-200 hover:text-primary active:scale-90"
      >
        <span className="material-symbols-outlined" data-icon="shopping_cart">
          shopping_cart
        </span>
        <span className="font-label-md text-label-md mt-0.5">Cart</span>
      </Link>
      <Link
        href="/account"
        className="flex flex-col items-center justify-center text-on-surface-variant transition-colors duration-200 hover:text-primary active:scale-90"
      >
        <span className="material-symbols-outlined" data-icon="person">
          person
        </span>
        <span className="font-label-md text-label-md mt-0.5">Account</span>
      </Link>
    </div>
  </nav>
);
