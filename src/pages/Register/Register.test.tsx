import { renderWithProviders } from 'test-utils/testStore';
import { logRoles, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from 'stores/store';
import constants from 'constants-custom';
import Register from '.';

const notLoggedInStore = {
  ui: {
    isLoading: false,
    isModalOpen: false,
  },
  user: {
    isLoggedIn: true,
    email: 'test@gmail.com',
  },
};

describe('Register', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  test('validate register', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Register />);

    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // expect error when clicking without inputting
    await user.click(signUpButton);
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();

    // expect error when input invalid email
    await user.clear(emailInput);
    await user.type(emailInput, 'invalid email');
    await user.click(signUpButton);
    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument();

    // expect error when password < 6 characters
    await user.clear(passwordInput);
    await user.type(passwordInput, '1212');
    await user.click(signUpButton);
    expect(
      await screen.findByText(
        'Password should be of minimum 6 characters length'
      )
    ).toBeInTheDocument();

    // expect error when password > 20 characters
    await user.clear(passwordInput);
    await user.type(passwordInput, '124809128940128904218904892104124891249');
    await user.click(signUpButton);
    expect(
      await screen.findByText(
        'Password should be of maximum 20 characters length'
      )
    ).toBeInTheDocument();

    // expect error when password has special character
    await user.clear(passwordInput);
    await user.type(passwordInput, 'ewafawef@_.');
    await user.click(signUpButton);
    expect(
      await screen.findByText('Character or Number only')
    ).toBeInTheDocument();
  });

  test('register successfully', async () => {
    const user = userEvent.setup();
    const store = setupStore(notLoggedInStore);
    const { container } = renderWithProviders(<Register />, { store });

    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.clear(emailInput);
    await user.type(emailInput, 'test@gmail.com');
    await user.clear(passwordInput);
    await user.type(passwordInput, '12122sS');
    await user.click(signUpButton);

    // expect localStorage set token
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      constants.TEST_TOKEN
    );

    const userState = store.getState().user;
    expect(userState).toEqual({
      isLoggedIn: true,
      email: 'do020@gmail.com',
    });
  });
});
