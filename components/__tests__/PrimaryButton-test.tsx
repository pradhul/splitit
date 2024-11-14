import { render, screen } from '@testing-library/react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { ReactTestInstance } from 'react-test-renderer';

describe('<PrimaryButton />', () => {

  let element:ReactTestInstance;

  beforeEach(() => {
    render(<PrimaryButton />);
  });

  test('text displays in correct style', () => {
    const element = screen.getByText('Record Payment');

    expect(element).toBeTruthy();
    expect(element).toHaveStyle({ color: '#424242' });
  });

  test('Button has the correct background color', () => {
    const element = screen.getByTestId('primary-button');

    expect(element).toHaveStyle({ backgroundColor: '#00796B' });
  });
});
