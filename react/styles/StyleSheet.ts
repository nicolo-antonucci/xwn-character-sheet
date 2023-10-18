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
    gap: 12,
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
    color: Theme.colors.onSurface,
    borderRadius: 16,
    gap: 18,
    paddingHorizontal: 6,
    paddingVertical: 18,
    width: '85%',
    maxHeight: '95%',
  },
  detailsCard: {},
  detailsCardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailsName: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  detailsBody: {
    width: '100%',
    backgroundColor: Theme.colors.surface,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 8,
  },
  modalOptBtnContainer: {
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  bold: {
    fontWeight: 'bold',
  },
  matTopTabs: {
    backgroundColor: Theme.colors.primaryContainer,
    color: Theme.colors.onPrimaryContainer,
  },
  flatGap: { gap: 18, paddingHorizontal: 12, paddingBottom: 18 },
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
  magicTableHeaderTxt: {
    paddingHorizontal: 3,
    paddingVertical: 6,
    fontSize: 12,
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
  magicTableRowTxt: {
    padding: 3,
    fontSize: 12,
    borderColor: Theme.colors.onPrimaryContainer,
    textAlign: 'center',
  },
  homeBtn: {
    width: '80%',
    height: 100,
    justifyContent: 'center',
  },
  homeBtnContent: {
    height: '100%',
    alignItems: 'center',
    gap: 18,
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
