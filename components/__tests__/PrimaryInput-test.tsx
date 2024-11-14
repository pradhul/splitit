import { fireEvent, render, screen } from '@testing-library/react-native';
import PrimaryInput from '@/components/PrimaryInput';
import { ReactElement } from 'react';
import { ReactTestInstance } from 'react-test-renderer';

describe('<PrimaryInput />', () => {

    let element: ReactTestInstance;

    beforeEach(() => {
        render(<PrimaryInput />);
        element = screen.getByPlaceholderText('₹');
    });

    test('PrimaryInput renders correctly with autofocus and number keypad', () => {    
        expect(element).toBeTruthy();   
        expect(element).toHaveProp('autoFocus', true);
        expect(element).toHaveProp('keyboardType', 'number-pad');
    })

    test('onChangetext changes the input value', () => {
        fireEvent.changeText(element, '200');

        expect(element).toHaveProp('value', '200');
    });
});