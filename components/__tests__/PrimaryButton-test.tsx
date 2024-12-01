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

describe("<PrimaryButton />", () => {
  let element: ReactTestInstance;

  beforeEach(() => {
    render(<PrimaryButton />);
  });

  test("text displays in correct style", () => {
    const element = screen.getByText("Record Payment");

    expect(element).toBeTruthy();
    expect(element).toHaveStyle({ color: "#424242" });
  });

  test("Button has the correct background color", () => {
    const element = screen.getByTestId("primary-button");

    expect(element).toHaveStyle({ backgroundColor: "#00796B" });
  });
});
