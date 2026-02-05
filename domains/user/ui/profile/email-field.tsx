import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

interface EmailFieldProps {
  email: string;
}

export function EmailField({ email }: EmailFieldProps) {
  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>이메일</FormLabel>
      <FormControl>
        <Input value={email} disabled />
      </FormControl>
    </FormItem>
  );
}
