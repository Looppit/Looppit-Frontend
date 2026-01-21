'use client';

import { useState } from 'react';

import { useCategories } from '@/domains/category/hooks';
import { useTodoForm } from '@/domains/home/hooks/use-todo-form';
import {
  TODO_FORM_MODE,
  type TodoFormMode,
} from '@/domains/home/hooks/use-todo-form-sheet';
import { TodoApiResponse } from '@/domains/home/types/todo.types';

import { CategorySelectSheet } from './category-select-sheet';
import { TodoFormSheetUI } from './todo-form-sheet.ui';

type TodoFormSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: TodoFormMode;
  initialCategoryId?: number | null;
  initialTodo?: TodoApiResponse;
  onSuccess?: () => void;
  title?: string;
  showSuggestedTags?: boolean;
  suggestedTags?: readonly string[];
};

export const TodoFormSheet = ({
  open,
  onOpenChange,
  mode,
  initialCategoryId,
  initialTodo,
  onSuccess,
  title,
  showSuggestedTags = true,
  suggestedTags,
}: TodoFormSheetProps) => {
  const { data: categories = [] } = useCategories();
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);

  const form = useTodoForm({
    mode,
    initialCategoryId,
    initialTodo,
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
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

  const handleCategoryClick = () => {
    setIsCategorySheetOpen(true);
  };

  const handleDateClick = () => {
    // TODO: 날짜 선택 모달 구현
  };

  const displayTitle =
    title ?? (mode === TODO_FORM_MODE.CREATE ? '투두 추가' : '투두 수정');
  const disabled = !todoText.trim() || !selectedCategoryId || isSubmitting;

  return (
    <>
      <TodoFormSheetUI
        open={open}
        onOpenChange={onOpenChange}
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
        {showSuggestedTags && (
          <div className="mt-4 flex items-center gap-4">
            <TodoFormSheetUI.SuggestedTags
              onTagClick={setTodoText}
              tags={suggestedTags}
            />
            <TodoFormSheetUI.SubmitButton
              disabled={disabled}
              onClick={handleSubmit}
            />
          </div>
        )}
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
