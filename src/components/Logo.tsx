import { Text } from 'native-base';

type Props = {
  color?: 'light' | 'default',
  size?: 'regular' | 'big',
}

export default function Logo({ color = 'default', size = 'big' }: Props) {
  return (
    <Text
      fontSize={size === 'big' ? '5xl' : '4xl'}
      color={color === 'default' ? 'primary.200' : 'light.50'}
      fontWeight={600}
    >
      MultiSoils
    </Text>
  );
};
