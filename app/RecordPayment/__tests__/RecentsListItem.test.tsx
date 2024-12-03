/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-02 04:15:36
 * @modify date 2024-12-02 04:15:36
 * @desc [description]
 */
import { render, screen } from "@testing-library/react-native";
import RecentsListItem from "./RecentsListItem";

/** This will have to be modified once listItems are renderd using an array of values */
describe("<RecentsListItem />", () => {
  test("listItem renders correctly", () => {
    render(<RecentsListItem />);

    expect(screen.getByText("Graphic")).toBeTruthy();
    expect(screen.getByText("Someone paid 100 to someone")).toBeTruthy();
    expect(screen.getByText("on 29th Friday evening 4:30")).toBeTruthy();
  });
});
