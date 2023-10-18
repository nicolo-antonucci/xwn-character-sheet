import { View } from 'react-native';
import { Text } from 'react-native-paper';
import traditions from '../../../assets/rules/wwnArcaneTraditions.json';
import { ArcaneTradition, ArcaneTraditionTable, MagicProgressionTable } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';
import MagicTable from './MagicTable';

export default function ArcaneTraditionDetails(props: ArcaneTraditionDetailsProps): JSX.Element {
  const getTradition = () => (traditions as ArcaneTraditionTable[]).find(at => at.name === props.tradition);

  return (
    <View style={{ ...Style.detailsBody, paddingHorizontal: 0 }}>
      {getTradition()?.description ? (
        <>
          <Text style={Style.bold}>Description</Text>
          <Text>{getTradition()?.description}</Text>
        </>
      ) : null}

      {getTradition()?.artsDescription ? (
        <>
          <Text style={Style.bold}>Arts</Text>
          <Text>{getTradition()?.artsDescription}</Text>
        </>
      ) : null}

      {getTradition()?.fullTable ? (
        <>
          <Text style={Style.bold}>Full {props.tradition}</Text>
          <MagicTable
            table={getTradition()?.fullTable as MagicProgressionTable}
            tradition={props.tradition}
            tableId={`full-${props.tradition}`}
          />
        </>
      ) : null}

      {getTradition()?.partialTable ? (
        <>
          <Text style={Style.bold}>Partial {props.tradition}</Text>
          <MagicTable
            table={getTradition()?.partialTable as MagicProgressionTable}
            tradition={props.tradition}
            tableId={`partial-${props.tradition}`}
          />
        </>
      ) : null}
    </View>
  );
}

export interface ArcaneTraditionDetailsProps {
  tradition: ArcaneTradition;
}
