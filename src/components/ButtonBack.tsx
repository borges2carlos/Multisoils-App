import { Icon } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ButtonBack() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity
      onPress={handleBack}
      style={{ zIndex: 9999 }}
    >
      <Icon
        as={Ionicons}
        name="chevron-back-circle-outline"
        color="primary.400"
        size="2xl"
      />
    </TouchableOpacity>
  );
};
