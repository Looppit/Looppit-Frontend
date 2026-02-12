import { useDeleteAccountForm } from '@/domains/settings/hooks';
import { StrictPropsWithChildren } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from '@/shared/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

type DeleteAccountSheetTriggerProps = StrictPropsWithChildren<{
  children: React.ReactNode;
}>;

export function DeleteAccountSheetTrigger({
  children,
}: DeleteAccountSheetTriggerProps) {
  const { form, isSnsUser, handleSubmit } = useDeleteAccountForm();

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-card rounded-t-3xl p-6">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <DrawerHeader>
              <DrawerTitle className="typography-title-lg">
                정말 탈퇴하시겠어요?
              </DrawerTitle>
            </DrawerHeader>
            <DrawerDescription className="text-center">
              탈퇴하면 모든 습관과 데이터가 사라지고 되돌릴 수 없어요.
            </DrawerDescription>

            {!isSnsUser && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 mt-4 mb-2">
                    <FormLabel className="sr-only typography-body-semibold">
                      비밀번호
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <DrawerFooter className="flex-row gap-2">
              <DrawerClose asChild>
                <Button variant="secondary">취소</Button>
              </DrawerClose>
              <Button
                variant="destructive"
                type="submit"
                disabled={!isSnsUser && !form.formState.isValid}
              >
                회원탈퇴
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
