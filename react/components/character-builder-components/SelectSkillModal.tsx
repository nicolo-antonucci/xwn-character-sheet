import { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { sortAlphabetically } from '../../commons/Utils';
import { RULESET } from '../../model/properties';
import { BASESKILLS, PSYSKILLS, SKILL_CHOICE, SWNSKILLS, SWNSkills, WWNSKILLS, WWNSkills } from '../../model/skills';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';

export default function SelectSkillModal(props: SelectSkillModalProps): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const skillBtn = ({ item }: { item: SWNSKILLS | WWNSKILLS | PSYSKILLS }) => (
    <Button
      key={`select-score-${item}`}
      mode={props.selectedValue === item ? 'contained' : 'contained-tonal'}
      onPress={() => props.confirmHandler(item)}
      style={Style.optionBtn}
    >
      {item}
    </Button>
  );

  return (
    <View style={{ ...Style.modal, maxHeight: '100%' }}>
      <Text style={Style.title}>Select a skill</Text>

      {props.type === SKILL_CHOICE.ANY_COMBAT ? (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={Style.modalOptBtnContainer}
          data={[BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB].sort(sortAlphabetically)}
          renderItem={skillBtn}
          showsVerticalScrollIndicator={false}
        />
      ) : null}

      {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_NON_COMBAT ? (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={Style.modalOptBtnContainer}
          data={Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills)
            .filter(k => !([BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB] as string[]).includes(k))
            .sort(sortAlphabetically)}
          renderItem={skillBtn}
          showsVerticalScrollIndicator={false}
        />
      ) : null}

      {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_SKILL ? (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={Style.modalOptBtnContainer}
          data={Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills).sort(
            sortAlphabetically,
          )}
          renderItem={skillBtn}
          showsVerticalScrollIndicator={false}
        />
      ) : null}

      {Array.isArray(props.type) ? (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={Style.modalOptBtnContainer}
          data={props.type.sort(sortAlphabetically)}
          renderItem={skillBtn}
          showsVerticalScrollIndicator={false}
        />
      ) : null}

      {props.type === 'Specialist' ? (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={Style.modalOptBtnContainer}
          data={Object.values(WWNSkills)
            .filter(k => ![WWNSkills.MAGIC, WWNSkills.STAB, WWNSkills.SHOOT, WWNSkills.PUNCH].includes(k))
            .sort(sortAlphabetically)}
          renderItem={skillBtn}
          showsVerticalScrollIndicator={false}
        />
      ) : null}

      {props.type === 'Vowed Effort Skill' ? (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={Style.modalOptBtnContainer}
          data={[BASESKILLS.EXERT, BASESKILLS.KNOW, WWNSkills.MAGIC, WWNSkills.PRAY].sort(sortAlphabetically)}
          renderItem={skillBtn}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
}

export interface SelectSkillModalProps {
  type: SKILL_CHOICE | (WWNSKILLS | SWNSKILLS | PSYSKILLS)[] | 'Specialist' | 'Vowed Effort Skill';
  selectedValue?: SWNSKILLS | WWNSKILLS | PSYSKILLS | undefined;
  confirmHandler: (skill: SWNSKILLS | WWNSKILLS | PSYSKILLS) => void;
  undoHandler: () => void;
}
