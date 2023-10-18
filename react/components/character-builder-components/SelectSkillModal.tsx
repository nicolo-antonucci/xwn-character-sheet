import { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RULESET } from '../../model/properties';
import { BASESKILLS, SKILL_CHOICE, SWNSKILLS, SWNSkills, WWNSKILLS, WWNSkills } from '../../model/skills';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';

export default function SelectSkillModal(props: SelectSkillModalProps): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  return (
    <View style={Style.modal}>
      <Text style={Style.title}>Select a skill</Text>

      {props.type === SKILL_CHOICE.ANY_COMBAT ? (
        <View style={Style.modalOptBtnContainer}>
          {[BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB].map(k => (
            <Button
              key={`select-score-${k}`}
              mode="contained-tonal"
              onPress={() => props.confirmHandler(k)}
              style={Style.optionBtn}
            >
              {k}
            </Button>
          ))}
        </View>
      ) : null}

      {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_NON_COMBAT ? (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills)
            .filter(k => !([BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB] as string[]).includes(k))
            .map(k => (
              <Button
                key={`select-score-${k}`}
                mode="contained-tonal"
                onPress={() => props.confirmHandler(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))}
        </View>
      ) : null}

      {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_SKILL ? (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills).map(k => (
            <Button
              key={`select-score-${k}`}
              mode="contained-tonal"
              onPress={() => props.confirmHandler(k)}
              style={Style.optionBtn}
            >
              {k}
            </Button>
          ))}
        </View>
      ) : null}

      {props.type === 'Specialist' ? (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(WWNSkills)
            .filter(k => ![WWNSkills.MAGIC, WWNSkills.STAB, WWNSkills.SHOOT, WWNSkills.PUNCH].includes(k))
            .map(k => (
              <Button
                key={`select-score-${k}`}
                mode="contained-tonal"
                onPress={() => props.confirmHandler(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))}
        </View>
      ) : null}

      {props.type === 'Vowed Effort Skill' ? (
        <View style={Style.modalOptBtnContainer}>
          {[BASESKILLS.EXERT, BASESKILLS.KNOW, WWNSkills.MAGIC, WWNSkills.PRAY].map(k => (
            <Button
              key={`select-score-${k}`}
              mode="contained-tonal"
              onPress={() => props.confirmHandler(k)}
              style={Style.optionBtn}
            >
              {k}
            </Button>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export interface SelectSkillModalProps {
  type: SKILL_CHOICE | 'Specialist' | 'Vowed Effort Skill';
  selectedValue?: SWNSKILLS | WWNSKILLS;
  confirmHandler: (skill: SWNSKILLS | WWNSKILLS) => void;
  undoHandler: () => void;
}
