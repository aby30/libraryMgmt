import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Book from '../index';
import { BookDetails } from './__mock.js';

afterEach(cleanup);

describe('Book card', () => {
    const addToCart = jest.fn();
    const removeFromCart = jest.fn();

    it('renders', () => {
        const { asFragment } = render(<Book bookDetails={BookDetails} addToCart={addToCart} removeFromCart={removeFromCart} />);
        expect(asFragment()).toMatchSnapshot();
    })

})