import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

export default function PasswordConfirmField() {
  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>비밀번호 확인</FormLabel>
      <FormControl>
        <Input type="password" placeholder="비밀번호를 한번 더 입력해주세요." />
      </FormControl>
    </FormItem>
  );
}
