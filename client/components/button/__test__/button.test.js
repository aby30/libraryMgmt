import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from '../index';

afterEach(cleanup);

describe('Button', () => {
    const buttonClick = jest.fn();

    it('renders', () => {
        const { asFragment } = render(<Button type='primary' size='medium' buttonClick={buttonClick} >Button text</Button>);
        expect(asFragment()).toMatchSnapshot();
    })

})