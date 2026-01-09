import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { COLORS, RADIUS } from '../../constants';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const DRAG_INDICATOR_WIDTH = 37;
const DRAG_INDICATOR_HEIGHT = 6;

interface CommonBottomSheetProps {
  children: React.ReactNode;
  handleComponentStyle?: any;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  enableContentPanningGesture?: boolean;
  onDismiss?: () => void;
}

export interface RBSheetRefType {
  openBSSheet: () => void;
  closeBSSheet: () => void;
  snapToIndex: (index: number) => void;
}

const CommonBottomSheet = forwardRef<RBSheetRefType, CommonBottomSheetProps>((props, ref) => {
  const {
    children,
    handleComponentStyle,
    snapPoints = ['95%'],
    enablePanDownToClose = true,
    enableContentPanningGesture = true,
    onDismiss,
  } = props;
  const sheetRef = useRef<BottomSheetModal>(null);
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      openBSSheet: () => setIsVisible(true),
      closeBSSheet: () => setIsVisible(false),
      snapToIndex: (index: number) => sheetRef.current?.snapToIndex(index),
    }),
    []
  );

  useEffect(() => {
    if (isVisible) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.close();
    }
  }, [isVisible]);

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onDismiss?.();
        setIsVisible(false);
      }
    },
    [onDismiss]
  );

  const handleComponent = useCallback(
    () => (
      <View style={[styles.handleComponent, handleComponentStyle]}>
        <View style={styles.dragIndicator} />
      </View>
    ),
    [handleComponentStyle]
  );

  return (
    <BottomSheetModal
      enablePanDownToClose={enablePanDownToClose}
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      handleComponent={handleComponent}
      backdropComponent={renderBackdrop}
      onDismiss={() => setIsVisible(false)}
      onChange={handleSheetChange}
      backgroundStyle={styles.background}
      keyboardBehavior="extend"
      keyboardBlurBehavior="none"
      android_keyboardInputMode="adjustResize"
      enableContentPanningGesture={enableContentPanningGesture}
      enableHandlePanningGesture
      enableDynamicSizing={false}
    >
      <View style={styles.container}>{children}</View>
    </BottomSheetModal>
  );
});

CommonBottomSheet.displayName = 'CommonBottomSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  handleComponent: {
    height: SCREEN_HEIGHT * 0.02,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    backgroundColor: COLORS.backgroundWhite,
  },
  dragIndicator: {
    width: DRAG_INDICATOR_WIDTH,
    height: DRAG_INDICATOR_HEIGHT,
    alignSelf: 'center',
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.01,
    backgroundColor: COLORS.dragIndicator,
    borderRadius: 50,
  },
  background: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
  },
});

export default CommonBottomSheet;
