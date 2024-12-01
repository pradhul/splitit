import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

type BounceConfig = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};
export function useBounce(
  bounceConfig: BounceConfig = { stiffness: 2500, damping: 25, mass: 0.5 }
) {
  const translateY = useSharedValue(0);
  const bounce = () => {
    translateY.value = withSequence(
      withSpring(+5, bounceConfig),
      withSpring(0, bounceConfig)
    );
  };

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { bounce, bounceStyle };
}
