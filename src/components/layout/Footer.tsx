import Image from 'next/image';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export const Footer = () => (
  <footer className="mt-stack-lg w-full border-t border-outline-variant bg-surface-container py-stack-lg">
    <div className="mx-auto mb-stack-lg grid max-w-container-max grid-cols-1 gap-gutter px-margin-desktop md:grid-cols-4">
      <div>
        <div>
          <Image
            src="/assets/images/logo.png"
            alt="GreenMart Logo"
            className="h-auto w-auto"
            width={120}
            height={50}
          />
        </div>
        <p className="mb-6 font-body-sm text-body-sm text-on-surface-variant">
          Support 2000+ local farmers and get the highest quality organic produce delivered to your
          doorstep within 24 hours.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-all hover:bg-primary hover:text-white"
          >
            <span className="material-symbols-outlined">public</span>
          </Link>
          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-all hover:bg-primary hover:text-white"
          >
            <span className="material-symbols-outlined">mail</span>
          </Link>
        </div>
      </div>
      <div>
        <h4 className="mb-4 font-title-md text-body-lg font-bold">Shop</h4>
        <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              Fresh Vegetables
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              Organic Fruits
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              Rice &amp; Grains
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              Herbs &amp; Spices
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="mb-4 font-title-md text-body-lg font-bold">Information</h4>
        <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              About Us
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              Delivery Information
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-colors hover:text-primary">
              Terms &amp; Conditions
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="mb-4 font-title-md text-body-lg font-bold">Contact Us</h4>
        <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">location_on</span> 123 Agri
            Street, CA
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">call</span> +1 234 567 8900
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">mail</span> hello@greenmart.com
          </li>
        </ul>
      </div>
    </div>
    <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-4 border-t border-outline-variant/30 px-margin-desktop pt-stack-md font-body-sm text-label-bold text-on-surface-variant md:flex-row">
      <p>© {new Date().getFullYear()} GreenMart. All rights reserved.</p>
      <LocaleSwitcher />
    </div>
  </footer>
);
