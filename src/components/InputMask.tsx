import { FormControl, Text, Input } from 'native-base'
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

type Props = TextInputMaskProps & {
  title: string;
  errorMessage?: string | null;
  isInvalid?: boolean;
}

export default function InputMask({title, errorMessage = null, isInvalid, ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <Text fontSize="sm" color="dark.50" fontWeight={400} mb={1}>{title}</Text>
      <TextInputMask
        customTextInput={Input}
        customTextInputProps={{
          bg: "light.50",
          borderColor: "gray.300",
          borderRadius: 10,
          fontSize: "sm",
          fontFamily: "body",
          fontWeight: 500,
          _focus: {
            bg: "light.50",
            borderColor: "gray.500",
          },
          h: 12,
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
