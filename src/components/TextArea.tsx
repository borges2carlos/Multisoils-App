import { TextArea as NativeBaseTextArea, ITextAreaProps, FormControl, Text } from 'native-base'

type Props = ITextAreaProps & {
  title?: string;
  errorMessage?: string | null;
}

export default function TextArea({title, errorMessage = null, isInvalid, ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      {!!title && (
        <Text fontSize="sm" color="dark.50" fontWeight={400} mb={1}>{title}</Text>
      )}
      <NativeBaseTextArea
        bg="light.50"
        borderColor="gray.300"
        borderRadius={10}
        fontSize="sm"
        fontFamily="body"
        fontWeight={500}
        autoCompleteType="none"
        _focus={{
          bg: "light.50",
          borderColor: "gray.500"
        }}
        h={150}
        isInvalid={invalid}
        {...rest}
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
