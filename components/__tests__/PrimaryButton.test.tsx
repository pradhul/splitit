/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-02 04:15:17
 * @modify date 2024-12-02 04:15:17
 * @desc [description]
 */
import { render, screen } from "@testing-library/react-native";
import PrimaryButton from "@/components/PrimaryButton";
import { ReactTestInstance } from "react-test-renderer";
import { ActivityIndicator, Text } from "react-native";
import MockedMaterialIcons from "@expo/vector-icons/MaterialIcons";

jest.mock("@expo/vector-icons/MaterialIcons", () => {
  const { View } = require("react-native");
  return jest.fn((props) => <View {...props} />);
});

describe("<PrimaryButton />", () => {
  let element: ReactTestInstance;

  test("text should display in correct style", () => {
    render(<PrimaryButton title="Record Payment" onPress={jest.fn()} />);
    const element = screen.getByText("Record Payment");

    expect(element).toBeTruthy();
    expect(element).toHaveStyle({ color: "#DCE0D9" });
  });

  test("Button should have the correct background color", () => {
    render(<PrimaryButton title="Record Payment" onPress={jest.fn()} />);
    const element = screen.getByTestId("primary-button");

    expect(element).toHaveStyle({ backgroundColor: "#5B1865" });
  });

  test("Disabled Button should have backGroundColor as #808080", () => {
    render(<PrimaryButton title="Record Payment" onPress={jest.fn()} disabled />);
    const element = screen.getByTestId("primary-button");

    expect(element).toHaveStyle({ backgroundColor: "#808080" });
  });

  test("A button of status 'pending' should have ActivityIndicator as buttonContent", () => {
    render(<PrimaryButton title="Record Payment" onPress={jest.fn()} status="pending" />);
    const element = screen.getByTestId("primary-button");

    const activityIndicator = element.findByType(ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
    expect(activityIndicator).toMatchObject({
      type: ActivityIndicator,
      props: {
        size: "small",
        color: "#fff",
      },
    });
  });

  test("A button of status 'success' should have 'done' of MaterialIcon as buttonContent", () => {
    render(<PrimaryButton title="Record Payment" onPress={jest.fn()} status="success" />);
    const element = screen.getByTestId("primary-button");

    const buttonContent = element.findByType(MockedMaterialIcons);
    expect(buttonContent).toBeTruthy();
    expect(buttonContent).toMatchObject({
      type: MockedMaterialIcons,
      props: {
        style: { alignSelf: "center" },
        name: "done",
        size: 24,
      },
    });
  });

  test("A button of status 'error' should have 'error' of MaterialIcons as buttonContent", () => {
    render(<PrimaryButton title="Record Payment" onPress={jest.fn()} status="error" />);
    const element = screen.getByTestId("primary-button");

    const buttonContent = element.findByType(MockedMaterialIcons);
    expect(buttonContent).toBeTruthy();
    expect(buttonContent).toMatchObject({
      type: MockedMaterialIcons,
      props: {
        style: { alignSelf: "center" },
        name: "error",
        size: 24,
      },
    });
  });

  test("The default PrimaryButton component should be enabled by default with buttonContent as Text", () => {
    render(<PrimaryButton title="Record Payment" onPress={jest.fn()} />);
    const element = screen.getByTestId("primary-button");
    const buttonContent = element.findByType(Text);

    expect(element).toBeTruthy();
    expect(element).toBeEnabled();
    expect(element.props.accessibilityState).toMatchObject({
      disabled: false,
    });

    expect(buttonContent).toBeTruthy();
  });
});