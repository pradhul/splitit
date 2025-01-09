/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-02 04:14:24
 * @modify date 2024-12-02 04:14:24
 * @desc [description]
 */
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withDelay,
  withSpring,
  withTiming,
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
    translateY.value = withSequence(withSpring(+5, bounceConfig), withSpring(0, bounceConfig));
  };

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { bounce, bounceStyle };
}

const DELAY = 500;
const DURATION = 1000;

type DelayVisibility = "show" | "hide";

export function useDelay() {
  const opacity = useSharedValue(0);
  const delay = (visibility: DelayVisibility) => {
    const timingToValue = visibility === "show" ? 1 : 0;
    opacity.value = withDelay(DELAY, withTiming(timingToValue, { duration: DURATION }));
  };
  const delayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return { delay, delayStyle };
}
