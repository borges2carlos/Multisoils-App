import React from 'react';
import { Button as NativeBaseButton, IButtonProps } from 'native-base';

type Props = IButtonProps & {
  title: string | React.ReactNode;
}

export default function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      borderRadius={100}
      _text={{
        fontWeight: 500,
        fontSize: rest.size,
      }}
      {...rest}
    >
      {title}
    </NativeBaseButton>
  );
};
