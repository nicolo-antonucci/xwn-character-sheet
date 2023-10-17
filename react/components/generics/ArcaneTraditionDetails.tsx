import { View } from 'react-native';
import { Text } from 'react-native-paper';
import traditions from '../../../assets/rules/wwnArcaneTraditions.json';
import { ArcaneTradition, ArcaneTraditionTable } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';

export default function ArcaneTraditionDetails(props: ArcaneTraditionDetailsProps): JSX.Element {
  const getTradition = () => (traditions as ArcaneTraditionTable[]).find(at => at.name === props.tradition);

  return (
    <View style={Style.detailsBody}>{!!getTradition()?.description && <Text>{getTradition()?.description}</Text>}</View>
  );
}

export interface ArcaneTraditionDetailsProps {
  tradition: ArcaneTradition;
}
