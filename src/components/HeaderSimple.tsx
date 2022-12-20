import { HStack, Text, Center } from 'native-base';

import ButtonBack from './ButtonBack';

type Props = {
  title: string;
}

export default function HeaderSimple({ title }: Props) {
  return (
    <HStack alignItems="center" px={4} pb={4} borderBottomWidth={1} borderBottomColor="gray.200">
      <ButtonBack />
      <Center flex={1} ml="-10">
      <Text fontWeight={500} color="dark.50" fontSize="lg">{title}</Text>
      </Center>
    </HStack>
  );
};
