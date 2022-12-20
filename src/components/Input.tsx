import { Input as NativeBaseInput, IInputProps, FormControl, Text } from 'native-base'

type Props = IInputProps & {
  title?: string;
  errorMessage?: string | null;
}

export default function Input({title, errorMessage = null, isInvalid, ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      {!!title && (
        <Text fontSize="sm" color="dark.50" fontWeight={400} mb={1}>{title}</Text>
      )}
      <NativeBaseInput
        bg="light.50"
        borderColor="gray.300"
        borderRadius={10}
        fontSize="sm"
        fontFamily="body"
        fontWeight={500}
        _focus={{
          bg: "light.50",
          borderColor: "gray.500"
        }}
        h={12}
        isInvalid={invalid}
        {...rest}
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
