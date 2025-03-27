import Home from "./Home";
import React from 'react'
import {render, screen} from "@testing-library/react";
import {describe, it, expect} from '@jest/globals';

describe('Home.jsx', () => {
    it('renders without crashing', () => {
        render(<Home />);
    })
    it('has a search input', () => {
        render(<Home />);
        expect(screen.getByRole('textbox'))
    })
})