import Home from "./Home";
import React from 'react'
import {render} from "@testing-library/react";
import {describe, it} from '@jest/globals';

describe('Home.jsx', () => {
    it('renders without crashing', () => {
        render(<Home />);
    })
})