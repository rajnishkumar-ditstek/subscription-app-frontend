import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  fieldsContainer: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.backgroundWhite,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  detailsContainer: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.backgroundWhite,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  categoryIcon: {
    width: 20,
    height: 20,
  },
  deleteButton: {
    marginTop: SPACING.xxxl,
  },
  bottomSpacing: {
    height: SPACING.xxxl,
  },
});
