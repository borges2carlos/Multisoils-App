import React from 'react';
import { Radio, IRadioProps, Text, Icon, HStack, VStack } from 'native-base'
import Feather from '@expo/vector-icons/Feather';

type Props = IRadioProps & {
  children?: React.ReactNode;
  text?: string;
  indice?: string;
  subCategory?: string;
  code?: string;
  showBorder?: boolean;
}

export default function RadioCustom({children, text, indice, subCategory, code, showBorder,  ...rest}: Props) {
  return (
    <VStack
      w="full"
      borderWidth={showBorder ? 1 : 0}
      borderRadius={10}
      borderColor="gray.300"
      py={showBorder ? 3 : 0}
      px={2}
      mb={showBorder ? 3 : 0}
    >
      <Radio
        my={1}
        _checked={{
          bg: 'primary.400'
        }}
        icon={<Icon as={Feather} name="check" />}
        _icon={{color: "light.50", size: 'sm'}}
        {...rest}
      >
        {!!indice && !!subCategory && !!code && (
          <HStack flex={1} px={2} justifyContent="space-between">
            <Text>{indice}</Text>
            <Text flex={0.8}>{subCategory}</Text>
            <Text>{code}</Text>
          </HStack>
        )}

        {!!text && (
          <VStack flex={1} px={2}>
            <Text>{text}</Text>
          </VStack>
        )}
      </Radio>

      {!!children && children}
    </VStack>
  );
};
