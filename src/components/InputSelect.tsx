import { Select, ISelectProps, FormControl, Text, CheckIcon } from 'native-base'

type Props = ISelectProps & {
  title?: string;
  errorMessage?: string | null;
  isInvalid?: boolean;
  options: {label: string, value: string}[]
}

export default function InputSelect({title, errorMessage = null, isInvalid, options, ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      {!!title && (
        <Text fontSize="sm" color="dark.50" fontWeight={400} mb={1}>{title}</Text>
      )}
      <Select
        bg="light.50"
        borderColor="gray.300"
        borderRadius={10}
        fontSize="sm"
        fontFamily="body"
        fontWeight={500}
        _selectedItem={{
          bg: "primary.200",
        }}
        h={12}
        {...rest}
      >
        {options.map((value) => (
          <Select.Item key={`${value.label}-${value.value}`} label={value.label} value={value.value} />
        ))}
      </Select>

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
