'use client';

import { useState } from 'react';

import { useCategories } from '@/domains/category/hooks';
import {
  TODO_FORM_MODE,
  useTodoFormSheet,
  useTodoForm,
} from '@/domains/home/hooks';

import { CategorySelectSheet } from './category-select-sheet';
import { TodoFormSheetUI } from './todo-form-sheet.ui';

export const TodoFormSheet = () => {
  const { isOpen, mode, categoryId, editingTodo, closeSheet } =
    useTodoFormSheet();

  const { data: categories = [] } = useCategories({ enabled: isOpen });
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);

  const form = useTodoForm({
    mode,
    initialCategoryId: categoryId,
    initialTodo: editingTodo,
    categories,
    onSuccess: () => {
      closeSheet();
    },
  });

  const {
    todoText,
    setTodoText,
    selectedCategory,
    date,
    handleSubmit,
    isSubmitting,
    selectedCategoryId,
    setSelectedCategoryId,
  } = form;

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
    <>
      <TodoFormSheetUI
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={displayTitle}
      >
        <TodoFormSheetUI.Input
          value={todoText}
          onChange={setTodoText}
          onSubmit={handleSubmit}
        />
        <div className="h-px w-full bg-white/5" />
        <TodoFormSheetUI.OptionsBar
          date={date}
          selectedCategory={selectedCategory}
          onDateClick={handleDateClick}
          onCategoryClick={handleCategoryClick}
        />
        <div className="mt-4 flex items-center gap-4">
          <TodoFormSheetUI.SuggestedTags onTagClick={setTodoText} />
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
        onSelect={setSelectedCategoryId}
      />
    </>
  );
};
