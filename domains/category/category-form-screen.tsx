'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  CATEGORY_COLORS,
  CATEGORY_FORM_MODE,
  CATEGORY_ICON_PREVIEW,
  CategoryFormMode,
} from '@/domains/category/constants';
import {
  useCategoryForm,
  useCategoryFormParams,
} from '@/domains/category/hooks';
import { CategoryForm, CategoryIconsSheet } from '@/domains/category/ui';
import { QueryErrorBoundary } from '@/shared/ui/async-boundary';
import { DetailHeader } from '@/shared/ui/detail-header';
import { Form } from '@/shared/ui/form';

type CategoryFormScreenProps = {
  mode: CategoryFormMode;
};

const CategoryFormScreenContent = ({ mode }: CategoryFormScreenProps) => {
  const router = useRouter();
  const isEditMode = mode === CATEGORY_FORM_MODE.EDIT;
  const [isOpen, setIsOpen] = useState(false);

  const formParams = useCategoryFormParams(mode);
  const {
    form,
    categoryName,
    selectedIcon,
    selectedColor,
    handleSubmit,
    isSubmitting,
  } = useCategoryForm(formParams);

  const { isValid } = form.formState;
  const disabled = !isValid || isSubmitting;

  const categoryNameError = form.formState.errors.categoryName;

  return (
    <>
      <DetailHeader
        title={isEditMode ? '카테고리 수정' : '새 카테고리'}
        onLeftClick={() => router.back()}
      />
      <Form {...form}>
        <CategoryForm>
          <CategoryForm.Preview icon={selectedIcon} color={selectedColor} />
          <CategoryForm.Input
            value={categoryName}
            maxLength={15}
            autoFocus
            onChange={(value) =>
              form.setValue('categoryName', value, { shouldValidate: true })
            }
            error={categoryNameError}
          />
          <CategoryForm.IconSelector
            icons={CATEGORY_ICON_PREVIEW}
            selectedIcon={selectedIcon}
            onIconChange={(icon) => form.setValue('categoryIconName', icon)}
            onMoreOpen={() => setIsOpen(true)}
          />
          <CategoryForm.ColorSelector
            colors={CATEGORY_COLORS}
            selectedColor={selectedColor}
            onColorChange={(color) => form.setValue('categoryColor', color)}
          />
        </CategoryForm>
        <CategoryForm.SubmitButton
          disabled={disabled}
          onClick={handleSubmit}
          isSubmitting={isSubmitting}
          buttonText={isEditMode ? '카테고리 수정하기' : '카테고리 만들기'}
        />
      </Form>
      <CategoryIconsSheet
        open={isOpen}
        setOpen={setIsOpen}
        selectedIcon={selectedIcon}
        onIconChange={(icon) => form.setValue('categoryIconName', icon)}
      />
    </>
  );
};

const CategoryFormScreen = ({ mode }: CategoryFormScreenProps) => {
  return (
    <QueryErrorBoundary loadingFallback={<></>}>
      <CategoryFormScreenContent mode={mode} />
    </QueryErrorBoundary>
  );
};

export default CategoryFormScreen;
