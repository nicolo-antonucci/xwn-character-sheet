import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import foci from '../../../assets/rules/wwnFoci.json';
import { CharacterFocusInfo } from '../../model/character';
import { Focus, FocusSource } from '../../model/focus';
import { Style } from '../../styles/StyleSheet';
import ExpandableCard from '../generics/ExpandableCard';

export default function FocusPicker(props: FocusPickerProps): JSX.Element {
  const getFocus = () => (foci as Focus[]).find(f => f.id === props.focus?.focusId);

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ ...Style.subHeading, fontSize: 16 }}>
        Choose a
        {props.type === FocusSource.WARRIOR ? ' combat ' : props.type === FocusSource.EXPERT ? ' non-combat ' : ' '}
        focus
      </Text>
      {props.focus ? <ExpandableCard element={getFocus() as Focus} type={'focus'} /> : null}
      <Button mode="contained-tonal" onPress={props.onRequestFocusPick} style={{ alignSelf: 'center' }}>
        {props.focus ? 'Change' : 'Choose'}
      </Button>

      {props.focus?.level === 1 && getFocus()?.lv1?.skillChoice ? (
        <View style={Style.rowFlex}>
          <Text style={Style.bold}>Bonus Skill:</Text>
          <Text> {props.focus.skillChoices?.[0] ?? ' - '}</Text>
          <Button onPress={() => props.onRequestSkillPick(1)}>
            {props.focus.skillChoices?.[0] ? 'Change' : 'Choose'}
          </Button>
        </View>
      ) : null}

      {props.focus?.level === 2 && getFocus()?.lv2?.skillChoice ? (
        <View style={Style.rowFlex}>
          <Text style={Style.bold}>Bonus Skill:</Text>
          <Text> {props.focus.skillChoices?.[1] ?? ' - '}</Text>
          <Button onPress={() => props.onRequestSkillPick(2)}>
            {props.focus.skillChoices?.[1] ? 'Change' : 'Choose'}
          </Button>
        </View>
      ) : null}
    </View>
  );
}

export interface FocusPickerProps {
  focus: CharacterFocusInfo | undefined;
  type: FocusSource;
  onRequestFocusPick: () => void;
  onRequestSkillPick: (lvl: 1 | 2) => void;
}
