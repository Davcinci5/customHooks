import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocalSessionTester from './LocalSessionTester';
import { UseLocalStorage, useSessionStorage } from '../tools/hooks'

describe('using customized hooks', () => {
    test('UseLocalStorage',()=> {
        render(<LocalSessionTester keyVal={'1'} value={1} hook={UseLocalStorage}/>);
        expect(screen.getByText('Stored value 1')).toBeInTheDocument();
        userEvent.type(screen.getByRole('textbox'), 'JavaScript');
        userEvent.click(screen.getByRole('button'))
        expect(screen.getByText('Stored value JavaScript')).toBeInTheDocument();
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'React' },
          });
        userEvent.click(screen.getByRole('button'))
       expect(screen.getByText('Stored value React')).toBeInTheDocument();
    })

    test('Using SessionStorage', () =>{
      render(<LocalSessionTester keyVal={'session'} value={'true'} hook={useSessionStorage}/>);
      expect(screen.getByText('Stored value true')).toBeInTheDocument();
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'React' },
      });
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Stored value React')).toBeInTheDocument();
      userEvent.click(screen.getByRole('button'))
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: true },
      });
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Stored value true')).toBeInTheDocument();
    });
})