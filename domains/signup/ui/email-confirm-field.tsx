import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/shared/ui/input-group';

interface EmailConfirmFieldProps {
  timer: string;
}

export default function EmailConfirmField({
  timer = '5:00',
}: EmailConfirmFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    setError('이메일 인증에 실패했습니다.');
  };

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>이메일</FormLabel>
      <FormControl>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput placeholder="인증번호를 입력해주세요." />
            <InputGroupAddon align="inline-end">
              <InputGroupText className="text-xs text-gray-500">
                {timer}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Button variant="outline" onClick={handleConfirm}>
            인증하기
          </Button>
        </div>
      </FormControl>
      {error && <FieldError>{error}</FieldError>}
    </FormItem>
  );
}
