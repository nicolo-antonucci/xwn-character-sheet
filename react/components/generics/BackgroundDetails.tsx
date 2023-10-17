import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Background } from '../../model/backgrounds';
import { Style } from '../../styles/StyleSheet';
import RollTable from './RollTable';

export default function BackgroundDetails(props: BackgroundDetailsProps): JSX.Element {
  return (
    <View style={Style.detailsBody}>
      <Text>{props.background.description}</Text>
      <View style={{ ...Style.rowFlex, alignItems: 'flex-start', justifyContent: 'space-around' }}>
        <View style={{ ...Style.colFlex, gap: 6 }}>
          <Text style={{ fontWeight: 'bold' }}>Free Skill</Text>
          <Text>{props.background.freeSkill}</Text>
        </View>
        <View style={{ ...Style.colFlex, gap: 6 }}>
          <Text style={{ fontWeight: 'bold' }}>Quick Skills</Text>
          {props.background.quickPicks?.map((qs, i) => <Text key={`qs-${qs}-${i}`}>{qs}</Text>)}
        </View>
      </View>
      <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
        <RollTable
          tableId={`${props.background.name}-growth-table`}
          title="Growth"
          elements={
            props.background.growthChoices?.map(el => ({
              label: el,
              weight: 1,
            })) ?? []
          }
        />
        <RollTable
          tableId={`${props.background.name}-learning-table`}
          title="Learning"
          elements={
            props.background.learningChoices?.map(el => ({
              label: el,
              weight: 1,
            })) ?? []
          }
        />
      </View>
    </View>
  );
}

export interface BackgroundDetailsProps {
  background: Background;
}
