'use client';

import { useState } from 'react';

import { useCategories } from '@/domains/category/hooks';
import {
  TODO_FORM_MODE,
  useTodoFormSheet,
  useTodoForm,
} from '@/domains/home/hooks';
import { Form } from '@/shared/ui/form';

import { CategorySelectSheet } from './category-select-sheet';
import { TodoFormSheetUI } from './todo-form-sheet.ui';

export const TodoFormSheet = () => {
  const { isOpen, mode, categoryId, editingTodo, closeSheet } =
    useTodoFormSheet();

  const { data: categories = [] } = useCategories({ enabled: isOpen });
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);

  const { form, selectedCategory, handleSubmit, isSubmitting } = useTodoForm({
    mode,
    initialCategoryId: categoryId,
    initialTodo: editingTodo,
    categories,
    onSuccess: () => {
      closeSheet();
    },
  });

  const todoText = form.watch('title');
  const selectedCategoryId = form.watch('categoryId');
  const date = form.watch('date');

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeSheet();
    }
  };

  const handleCategoryClick = () => {
    setIsCategorySheetOpen(true);
  };

  const handleDateClick = () => {
    // TODO: 날짜 선택 모달 구현
  };

  const displayTitle =
    mode === TODO_FORM_MODE.CREATE ? '투두 추가' : '투두 수정';
  const disabled = !todoText.trim() || !selectedCategoryId || isSubmitting;

  return (
    <Form {...form}>
      <TodoFormSheetUI
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={displayTitle}
      >
        <TodoFormSheetUI.Input
          value={todoText}
          onChange={(value) => form.setValue('title', value)}
          onSubmit={handleSubmit}
          maxLength={100}
        />
        <div className="h-px w-full bg-white/5" />
        <TodoFormSheetUI.OptionsBar
          date={date}
          selectedCategory={selectedCategory}
          onDateClick={handleDateClick}
          onCategoryClick={handleCategoryClick}
        />
        <div className="mt-4 flex items-center gap-4">
          <TodoFormSheetUI.SuggestedTags
            onTagClick={(tag) => form.setValue('title', tag)}
          />
          <TodoFormSheetUI.SubmitButton
            disabled={disabled}
            onClick={handleSubmit}
          />
        </div>
      </TodoFormSheetUI>
      <CategorySelectSheet
        open={isCategorySheetOpen}
        onOpenChange={setIsCategorySheetOpen}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelect={(categoryId) => form.setValue('categoryId', categoryId)}
      />
    </Form>
  );
};
