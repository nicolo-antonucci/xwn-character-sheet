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
  builderScreensContainer: {
    height: '100%',
    gap: 24,
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  builderNavigatorContainer: {
    height: '50%',
  },
  scoresContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  perkCard: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
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
  detailsCard: {
    margin: 12,
    paddingHorizontal: 12,
  },
  detailsCardHeader: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailsName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsBody: {
    gap: 12,
    paddingTop: 12,
    paddingBottom: 24,
  },
  modalOptBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  optionBtn: {
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
  tableHeader: {
    backgroundColor: Theme.colors.primaryContainer,
    borderWidth: 1,
    borderColor: Theme.colors.onPrimaryContainer,
    flexDirection: 'row',
  },
  tableHeaderTxt: {
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Theme.colors.onPrimaryContainer,
    borderColor: Theme.colors.onPrimaryContainer,
  },
  tableRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Theme.colors.onPrimaryContainer,
  },
  tableRowTxt: {
    padding: 6,
    fontSize: 12,
    borderColor: Theme.colors.onPrimaryContainer,
    textAlign: 'center',
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
