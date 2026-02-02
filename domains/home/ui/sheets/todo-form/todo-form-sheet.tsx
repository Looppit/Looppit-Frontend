'use client';

import { useState } from 'react';

import { format, parseISO } from 'date-fns';
import { useAtomValue } from 'jotai';

import { useCategories } from '@/domains/category/hooks';
import { TODO_FORM_MODE } from '@/domains/home/constants';
import { useTodoForm } from '@/domains/home/hooks';
import { todoDateAtom } from '@/domains/home/store';
import { SheetComponentProps, TodoFormSheetProps } from '@/domains/home/types';
import { Form } from '@/shared/ui/form';

import { CategorySelectSheet } from '../category-select-sheet';
import { TodoFormDateSheet } from './todo-form-date-sheet';
import { TodoFormSheetUI } from './todo-form-sheet.ui';

export const TodoFormSheet = ({
  props,
  onClose,
}: SheetComponentProps<TodoFormSheetProps>) => {
  const { mode, categoryId } = props;
  const editingTodo = props.mode === 'edit' ? props.todo : undefined;
  const selectedDateFromCalendar = useAtomValue(todoDateAtom);

  const { data: categories = [] } = useCategories();
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isCalendarSheetOpen, setIsCalendarSheetOpen] = useState(false);

  const { form, selectedCategory, handleSubmit, isSubmitting } = useTodoForm({
    mode,
    initialCategoryId: categoryId,
    initialTodo: editingTodo,
    initialSelectedDate:
      mode === TODO_FORM_MODE.CREATE ? selectedDateFromCalendar : undefined,
    categories,
    onSuccess: () => {
      onClose();
    },
  });

  const todoText = form.watch('title');
  const selectedCategoryId = form.watch('categoryId');
  const date = form.watch('date');

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleCategoryClick = () => {
    setIsCategorySheetOpen(true);
  };

  const handleDateClick = () => {
    setIsCalendarSheetOpen(true);
  };

  const calendarSelectedDate =
    mode === TODO_FORM_MODE.EDIT ? parseISO(date) : selectedDateFromCalendar;

  const handleCalendarSelect = (selected: Date | undefined) => {
    if (selected) {
      form.setValue('date', format(selected, 'yyyy-MM-dd'));
    }
    setIsCalendarSheetOpen(false);
  };

  const displayTitle =
    mode === TODO_FORM_MODE.CREATE ? '투두 추가' : '투두 수정';
  const disabled = !todoText.trim() || !selectedCategoryId || isSubmitting;

  return (
    <Form {...form}>
      <TodoFormSheetUI
        open={true}
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
      <TodoFormDateSheet
        open={isCalendarSheetOpen}
        onOpenChange={setIsCalendarSheetOpen}
        selectedDate={calendarSelectedDate}
        onSelect={handleCalendarSelect}
        completedCategoryData={{}}
      />
    </Form>
  );
};
