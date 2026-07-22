'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useCategoriesQuery } from '@/features/categories/hooks/useCategories';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { useRouter } from '@/libs/I18nNavigation';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useAddProductImageMutation,
} from '../hooks/useSellerProducts';
import type { SellerProduct } from '../types/seller-product';

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  stock: z.number().min(0),
  category_id: z.string().min(1),
  is_active: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export type SellerProductFormProps = {
  initialData?: SellerProduct;
};

// Flatten categories for select
const flattenCategories = (nodes: CategoryTreeNode[]): { id: string; name: string }[] => {
  const result: { id: string; name: string }[] = [];
  for (const node of nodes) {
    result.push({ id: node.id, name: node.name });
    if (node.children && node.children.length > 0) {
      result.push(...flattenCategories(node.children));
    }
  }
  return result;
};

export function SellerProductForm({ initialData }: SellerProductFormProps) {
  const t = useTranslations('SellerProducts');
  const router = useRouter();
  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation(initialData?.id ?? '');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const addImageMutation = useAddProductImageMutation();

  const { data: categoriesData } = useCategoriesQuery();
  const categories = flattenCategories(categoriesData ?? []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: '',
      price: initialData?.price ?? 0,
      stock: initialData?.stock ?? 0,
      category_id: initialData?.category_id ?? '',
      is_active: initialData?.is_active ?? true,
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      let productId = initialData?.id;

      const valuesForMutation = {
        ...values,
      };
      if (initialData) {
        await updateMutation.mutateAsync(valuesForMutation);
        toast.success(t('update_success'));
      } else {
        const result = await createMutation.mutateAsync(valuesForMutation);
        productId = result.id;
        toast.success(t('create_success'));
      }

      // Upload images if any
      if (productId && selectedImages.length > 0) {
        try {
          // Upload all images concurrently
          await Promise.all(
            selectedImages.map(async (file) => {
              const formData = new FormData();
              formData.append('image', file);
              await addImageMutation.mutateAsync({ id: productId, formData });
            }),
          );
          toast.success('Images uploaded successfully');
        } catch {
          toast.error('Failed to upload some images');
        }
      }

      router.push('/seller/products');
    } catch {
      toast.error(t('save_failed'));
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          {t('field_name')}
        </label>
        <Input id="name" {...form.register('name')} />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          {t('field_description')}
        </label>
        <textarea
          id="description"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          {...form.register('description')}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">
            {t('field_price')}
          </label>
          <Input
            id="price"
            type="number"
            step="any"
            {...form.register('price', { valueAsNumber: true })}
          />
          {form.formState.errors.price && (
            <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="stock" className="text-sm font-medium">
            {t('field_stock')}
          </label>
          <Input id="stock" type="number" {...form.register('stock', { valueAsNumber: true })} />
          {form.formState.errors.stock && (
            <p className="text-sm text-destructive">{form.formState.errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="category_id" className="text-sm font-medium">
          {t('field_category')}
        </label>
        <select
          id="category_id"
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          {...form.register('category_id')}
        >
          <option value="">{t('select_category')}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {form.formState.errors.category_id && (
          <p className="text-sm text-destructive">{form.formState.errors.category_id.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">{t('field_active')}</label>
          <p className="text-sm text-muted-foreground">{t('field_active_desc')}</p>
        </div>
        <Switch
          checked={form.watch('is_active')}
          onCheckedChange={(checked) => {
            form.setValue('is_active', checked);
          }}
        />
      </div>

      {/* Image upload could be placed here */}
      <div className="space-y-2">
        <label htmlFor="images" className="text-sm font-medium">
          {t('field_images')}
        </label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            setSelectedImages([...(e.target.files ?? [])]);
          }}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            router.back();
          }}
        >
          {t('cancel')}
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {initialData ? t('update') : t('create')}
        </Button>
      </div>
    </form>
  );
}
