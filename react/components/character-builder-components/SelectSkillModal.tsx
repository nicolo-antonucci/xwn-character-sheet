import { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RULESET } from '../../model/properties';
import { BASESKILLS, PSYSKILLS, SKILL_CHOICE, SWNSKILLS, SWNSkills, WWNSKILLS, WWNSkills } from '../../model/skills';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import { sortAlphabetically } from '../../commons/Utils';

export default function SelectSkillModal(props: SelectSkillModalProps): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  return (
    <View style={Style.modal}>
      <Text style={Style.title}>Select a skill</Text>

      <View style={Style.modalOptBtnContainer}>
        {props.type === SKILL_CHOICE.ANY_COMBAT
          ? [BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB].sort(sortAlphabetically).map(k => (
              <Button
                key={`select-score-${k}`}
                mode="contained-tonal"
                onPress={() => props.confirmHandler(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))
          : null}

        {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_NON_COMBAT
          ? Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills)
              .filter(k => !([BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB] as string[]).includes(k))
              .sort(sortAlphabetically)
              .map(k => (
                <Button
                  key={`select-score-${k}`}
                  mode="contained-tonal"
                  onPress={() => props.confirmHandler(k)}
                  style={Style.optionBtn}
                >
                  {k}
                </Button>
              ))
          : null}

        {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_SKILL
          ? Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills)
              .sort(sortAlphabetically)
              .map(k => (
                <Button
                  key={`select-score-${k}`}
                  mode="contained-tonal"
                  onPress={() => props.confirmHandler(k)}
                  style={Style.optionBtn}
                >
                  {k}
                </Button>
              ))
          : null}

        {Array.isArray(props.type)
          ? props.type.sort(sortAlphabetically).map(k => (
              <Button
                key={`select-score-${k}`}
                mode="contained-tonal"
                onPress={() => props.confirmHandler(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))
          : null}

        {props.type === 'Specialist'
          ? Object.values(WWNSkills)
              .filter(k => ![WWNSkills.MAGIC, WWNSkills.STAB, WWNSkills.SHOOT, WWNSkills.PUNCH].includes(k))
              .sort(sortAlphabetically)
              .map(k => (
                <Button
                  key={`select-score-${k}`}
                  mode="contained-tonal"
                  onPress={() => props.confirmHandler(k)}
                  style={Style.optionBtn}
                >
                  {k}
                </Button>
              ))
          : null}

        {props.type === 'Vowed Effort Skill'
          ? [BASESKILLS.EXERT, BASESKILLS.KNOW, WWNSkills.MAGIC, WWNSkills.PRAY].sort(sortAlphabetically).map(k => (
              <Button
                key={`select-score-${k}`}
                mode="contained-tonal"
                onPress={() => props.confirmHandler(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))
          : null}
      </View>
    </View>
  );
}

export interface SelectSkillModalProps {
  type: SKILL_CHOICE | (WWNSKILLS | SWNSKILLS | PSYSKILLS)[] | 'Specialist' | 'Vowed Effort Skill';
  selectedValue?: SWNSKILLS | WWNSKILLS | PSYSKILLS | undefined;
  confirmHandler: (skill: SWNSKILLS | WWNSKILLS | PSYSKILLS) => void;
  undoHandler: () => void;
}
