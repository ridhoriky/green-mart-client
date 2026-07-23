'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Star, Loader2, ImagePlus, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCreateReviewMutation } from '@/features/reviews/hooks/useReview';
import type { CreateReviewRequest } from '@/features/reviews/types/review';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5),
  comment: z.string().optional(),
  images: z.array(z.string()).optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export type ReviewFormProps = {
  order_id: string;
  product_id: string;
  onClose: () => void;
  onSuccess?: () => void;
};

export const ReviewForm = (props: ReviewFormProps) => {
  // Using next-intl
  // Fallback text is provided if translations are missing
  const t = useTranslations('ReviewForm');

  const { mutate: createReview, isPending } = useCreateReviewMutation();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
      images: [],
    },
  });

  const onSubmit = (values: ReviewFormValues) => {
    if (values.rating === 0) {
      form.setError('rating', { type: 'manual', message: 'Rating is required' });
      return;
    }

    const payload: CreateReviewRequest = {
      order_id: props.order_id,
      product_id: props.product_id,
      rating: values.rating,
      comment: values.comment,
      images: values.images,
    };

    createReview(payload, {
      onSuccess: () => {
        toast.success(t('success_message') || 'Review submitted successfully');
        props.onSuccess?.();
        props.onClose();
      },
      onError: () => {
        toast.error(t('error_message') || 'Failed to submit review');
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-on-surface">{t('title') || 'Write a Review'}</h2>
          <button
            type="button"
            onClick={props.onClose}
            className="text-on-surface-variant hover:text-on-surface"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('rating_label') || 'Rating'}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            field.onChange(star);
                          }}
                          className={`text-2xl transition-colors ${
                            star <= field.value
                              ? 'text-yellow-400'
                              : 'text-outline hover:text-yellow-200'
                          }`}
                        >
                          <Star className={star <= field.value ? 'fill-current' : ''} size={32} />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('comment_label') || 'Comment (Optional)'}</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="min-h-25 w-full rounded-lg border border-outline bg-surface p-3 text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder={t('comment_placeholder') || 'Tell us about your experience...'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note: In a real implementation, you would add an image upload component here.
                For now, we leave it as an empty placeholder or basic file input. */}
            <div className="space-y-2">
              <p className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('photo_label') || 'Photos (Optional)'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-outline text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                >
                  <ImagePlus size={24} />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={props.onClose}>
                {t('cancel_button') || 'Cancel'}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('submit_button') || 'Submit Review'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
