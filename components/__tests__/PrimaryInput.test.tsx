/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-02 04:15:22
 * @modify date 2024-12-02 04:15:22
 * @desc [description]
 */
import { fireEvent, render, screen } from "@testing-library/react-native";
import PrimaryInput from "@/components/PrimaryInput";
import { ReactElement } from "react";
import { ReactTestInstance } from "react-test-renderer";

describe("<PrimaryInput />", () => {
  test("Default PrimaryInput should render with autofocus, keyboardType='default' with fontSize = 14", () => {
    render(<PrimaryInput placeholder="test" onValueChange={jest.fn()} inputValue="" />);
    let element = screen.getByTestId("primary-input");

    expect(element).toBeTruthy();
    expect(element).toHaveProp("autoFocus", true);
    expect(element).toHaveProp("keyboardType", "default");
    expect(element).toHaveStyle({ fontSize: 14 });
    expect(element).toHaveProp("value", "");
  });

  test("onChangeText changes the input value", () => {
    const mockOnValueChange = jest.fn();
    render(<PrimaryInput placeholder="test" onValueChange={mockOnValueChange} inputValue="" />);
    let element = screen.getByTestId("primary-input");

    fireEvent.changeText(element, "200");
    expect(mockOnValueChange).toHaveBeenCalledWith("200");
  });

  test("Keyboard of type number-pad should align text to center", () => {
    render(<PrimaryInput placeholder="test" onValueChange={jest.fn()} inputValue="" keyboardType="number-pad" />);
    let element = screen.getByTestId("primary-input");

    expect(element).toHaveStyle({ textAlign: "center" });
  });

  test("PlaceHolder color should be #808080", () => {
    render(<PrimaryInput placeholder="test" onValueChange={jest.fn()} inputValue="" />);
    let element = screen.getByTestId("primary-input");

    expect(element).toHaveProp("placeholderTextColor", "#808080");
  });
});
