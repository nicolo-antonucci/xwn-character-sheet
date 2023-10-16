import { Pressable, View } from 'react-native';
import { Background } from '../../model/backgrounds';
import { Style } from '../../styles/StyleSheet';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { useState } from 'react';
import RollTable from './RollTable';

export default function BackgroundCard(props: BackgroundCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const toggleChosen = () => props.onSelectionToggle(!props.chosen);

  return (
    <Card style={Style.bgCard}>
      <Pressable style={Style.bgCardHeader} onPress={toggleOpen}>
        <Text style={Style.bgName}>{props.background.name?.toUpperCase()}</Text>
        {props.edit && (
          <Button
            icon={props.chosen ? 'check' : 'plus'}
            mode={props.chosen ? 'contained' : 'outlined'}
            onPress={toggleChosen}
          >
            {props.chosen ? 'CHOSEN' : 'CHOOSE'}
          </Button>
        )}
      </Pressable>
      {isOpen && <Divider />}
      {isOpen && (
        <View style={Style.bgDetails}>
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
            ></RollTable>
            <RollTable
              tableId={`${props.background.name}-learning-table`}
              title="Learning"
              elements={
                props.background.learningChoices?.map(el => ({
                  label: el,
                  weight: 1,
                })) ?? []
              }
            ></RollTable>
          </View>
          <Button icon="chevron-up" onPress={() => setIsOpen(false)}>
            Collapse
          </Button>
        </View>
      )}
    </Card>
  );
}

export interface BackgroundCardProps {
  background: Background;
  edit: boolean;
  chosen: boolean;
  onSelectionToggle: (value: boolean) => void;
}
