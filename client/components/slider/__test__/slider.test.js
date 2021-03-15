import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Slider from '../index';
import { SliderData } from './__mock.js';

afterEach(cleanup);

describe('Book card', () => {
    const removeFromSlider = jest.fn();
    const borrowBook = jest.fn();
    const hideSlider = jest.fn();

    it('renders with main cta visible', () => {
        const { asFragment } = render(
            <Slider
                sliderTitleText='Slider text'
                sliderItems={SliderData}
                removeFromSlider={removeFromSlider}
                borrowBook={borrowBook}
                hideSlider={hideSlider}
                showCustomMsg='This is custom msg'
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with main cta hidden', () => {
        const { asFragment } = render(
            <Slider
                sliderTitleText='Slider text'
                sliderItems={SliderData}
                removeFromSlider={removeFromSlider}
                borrowBook={borrowBook}
                hideSlider={hideSlider}
                showCustomMsg='This is custom msg'
                hideMainCta
            />
        );
        expect(asFragment()).toMatchSnapshot();
    })

})