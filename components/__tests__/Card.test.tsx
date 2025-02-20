import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import Card from "../Card";
import { BorderRadius } from "@/constants/Dimensions";

describe("<Card />", () => {
  test("should render the content given inside", () => {
    render(<Card><Text>Test</Text></Card>);
    const textElement = screen.getByText('Test');
    
    expect(textElement).toBeTruthy();
    expect(textElement.type).toBe("Text");
  });

  test("Wrapped cards should have the proper styles", () => {
    render(<Card><Text>Test</Text></Card>);
    const cardElement = screen.getByTestId("card");

    expect(cardElement).toHaveStyle({
      backgroundColor: "#fff",
      borderRadius: 10,
      marginBottom: 10,
      padding: 10
    })

  })
})