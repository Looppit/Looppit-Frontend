'use client';

import {
  AddTodoSheet,
  CategoryTodoSection,
  HabitStreakCard,
  HomeEmpty,
  HomeLoading,
  UserGreeting,
} from '@/domains/home/ui';

import { useHomeScreen } from './hooks/use-home-screen';

export const HomeScreen = () => {
  const {
    mergedTodos,
    checkedTodos,
    isTodosPending,
    isCategoriesPending,
    isAddTodoSheetOpen,
    initialCategoryId,
    handleAddTodo,
    handleClickTask,
    handleTodoCheckedChange,
    handleSheetOpenChange,
  } = useHomeScreen();

  if (isTodosPending || isCategoriesPending) {
    return <HomeLoading />;
  }

  if (!mergedTodos || mergedTodos.length === 0) {
    return <HomeEmpty />;
  }

  return (
    <>
      <div className="pt-9 px-5 min-h-screen flex flex-col gap-5">
        <UserGreeting
          name="Alex"
          profileImage="https://picsum.photos/seed/alex/200/200"
        />
        <HabitStreakCard />
        {mergedTodos.map((category) => {
          return (
            <CategoryTodoSection key={category.categoryId}>
              <CategoryTodoSection.Header
                category={category}
                onAddClick={() => handleAddTodo(category.categoryId)}
                onLabelClick={handleClickTask}
              />
              <CategoryTodoSection.List
                todos={category.todo}
                checkedTodos={checkedTodos}
                onLabelClick={handleClickTask}
                onTodoCheckedChange={handleTodoCheckedChange}
              />
            </CategoryTodoSection>
          );
        })}
      </div>
      <AddTodoSheet
        open={isAddTodoSheetOpen}
        onOpenChange={handleSheetOpenChange}
        initialCategoryId={initialCategoryId}
      />
    </>
  );
};
