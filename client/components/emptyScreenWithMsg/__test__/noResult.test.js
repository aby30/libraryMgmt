import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NoResult from '../index';

afterEach(cleanup);

describe('No Result screen', () => {

    it('renders', () => {
        const { asFragment } = render(<NoResult textToShow='No results text here' />);
        expect(asFragment()).toMatchSnapshot();
    })

})