'use client';

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { toast } from 'sonner';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link } from '@/libs/I18nNavigation';
import { useDeleteProductMutation, useUpdateProductMutation } from '../hooks/useSellerProducts';
import type { SellerProduct } from '../types/seller-product';

export type SellerProductTableProps = {
  products: SellerProduct[];
};

function ProductRow({ product }: { product: SellerProduct }) {
  const t = useTranslations('SellerProducts');
  const deleteMutation = useDeleteProductMutation();
  const updateMutation = useUpdateProductMutation(product.id);

  const handleToggleActive = async (checked: boolean) => {
    try {
      await updateMutation.mutateAsync({ is_active: checked });
      toast.success(t('status_updated'));
    } catch {
      toast.error(t('status_update_failed'));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(product.id);
      toast.success(t('delete_success'));
    } catch {
      toast.error(t('delete_failed'));
    }
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          {product.primary_image && (
            <Image
              src={product.primary_image}
              alt={product.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-md object-cover"
            />
          )}
          <div>
            <div className="line-clamp-1">{product.name}</div>
            <div className="text-xs text-muted-foreground">{product.category_name}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{formattedPrice}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.total_sold}</TableCell>
      <TableCell>
        <Switch
          checked={product.is_active}
          onCheckedChange={handleToggleActive}
          disabled={updateMutation.isPending}
        />
      </TableCell>
      <TableCell className="text-right">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ variant: 'ghost', className: 'h-8 w-8 p-0' })}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('column_actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`/seller/products/${product.id}/edit`}
                  className="flex w-full items-center"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  {t('edit')}
                </Link>
              </DropdownMenuItem>
              <DialogTrigger className="w-full text-left">
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('delete')}
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('confirm_delete')}</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your product.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className={buttonVariants({ variant: 'outline' })}>Cancel</DialogClose>
              <DialogClose
                className={buttonVariants({ variant: 'destructive' })}
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {t('delete')}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export function SellerProductTable(props: SellerProductTableProps) {
  const t = useTranslations('SellerProducts');
  // We can't use useUpdateProductMutation here easily for toggle without wrapping it in a component per row,
  // but let's do a quick wrapper or just use the mutation in a handler. Actually, since we need `id`, we can call the hook inside the row component.

  if (!props.products.length) {
    return (
      <div className="flex min-h-75 animate-in flex-col items-center justify-center rounded-md border border-dashed p-8 text-center fade-in-50">
        <h3 className="mt-4 text-lg font-semibold">{t('empty_title')}</h3>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">{t('empty_subtitle')}</p>
        <Link href="/seller/products/new" className={buttonVariants({ variant: 'default' })}>
          {t('add_product')}
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('column_name')}</TableHead>
            <TableHead>{t('column_price')}</TableHead>
            <TableHead>{t('column_stock')}</TableHead>
            <TableHead>{t('column_sold')}</TableHead>
            <TableHead>{t('column_status')}</TableHead>
            <TableHead className="text-right">{t('column_actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
