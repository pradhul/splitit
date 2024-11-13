import { render } from "@testing-library/react-native";
import PrimaryButton from "@/components/PrimaryButton";

describe("<PrimaryButton />", () => {
  test("Button Displays text correctly", () => {
    const screen = render(<PrimaryButton />);
    screen.getByText("Record Payment");
  });

  test("text displays in correct style", () => {
    const screen = render(<PrimaryButton />);
    const element = screen.getByText("Record Payment");

    expect(element).toHaveStyle({ color: "#424242" });
  });

  test("Button has the correct background color", () => {
    const screen = render(<PrimaryButton />);
    const element = screen.getByTestId("primary-button");

    expect(element).toHaveStyle({ backgroundColor: "#00796B" });
  });
});
