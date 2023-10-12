import { StyleSheet } from 'react-native';
import { Theme } from './Theme';

export const Style = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: Theme.colors.background,
    flex: 1,
  },
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    flex: 1,
    height: '100%',
  },
  homeContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 48,
  },
  builderContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  backgroundsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  bgNavigatorContainer: {
    
  },
  scoresContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  modal: {
    alignSelf: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: 16,
    color: Theme.colors.onSurface,
    gap: 24,
    paddingHorizontal: 12,
    paddingVertical: 24,
    width: '85%',
  },
  scoreBtnsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  scoreBtn: {
    flexBasis: '40%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  subHeading: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
  matTopTabs: {
    backgroundColor: Theme.colors.primaryContainer,
    color: Theme.colors.onPrimaryContainer,
  },
  colFlex: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
  },
  f1: {
    flex: 1,
  },
});

export const MatTopTabsScreenOpts = {
  tabBarActiveTintColor: Theme.colors.onPrimaryContainer,
  tabBarInactiveTintColor: Theme.colors.onPrimaryContainer,
  tabBarStyle: { backgroundColor: Theme.colors.primaryContainer },
  tabBarIndicatorStyle: {
    backgroundColor: Theme.colors.onPrimaryContainer,
  },
};
