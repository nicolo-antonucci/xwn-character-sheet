import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function AppBtn(props: AppBtnProps): JSX.Element {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: props.style?.backgroundColor ?? '#000',
      width: props.style?.width ?? '75%',
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    text: { color: props.style?.color ?? '#fff', textAlign: 'center' },
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={props.touchHandler}>
        <View>
          {props.icon && props.iconPosition !== 'right' && <Image source={{ uri: props.icon }} />}
          <Text style={styles.text}>{props.text.toUpperCase()}</Text>
          {props.icon && props.iconPosition === 'right' && <Image source={{ uri: props.icon }} />}
        </View>
      </Pressable>
    </View>
  );
}

export default AppBtn;

export interface AppBtnProps {
  text: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  style?: {
    backgroundColor?: string;
    color?: string;
    width?: number;
    height?: number;
  };
  touchHandler: () => void;
}
