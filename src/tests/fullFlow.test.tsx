import { renderWithProviders } from 'test-utils/testStore';
import { logRoles, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from 'stores/store';
import constants from 'constants-custom';
import App from 'App';
import { Context as ResponsiveContext } from 'react-responsive';

const notLoggedInStore = {
  ui: {
    isLoading: false,
    isModalOpen: false,
  },
  user: {
    isLoggedIn: false,
    email: 'test@gmail.com',
  },
};

jest.useRealTimers();
jest.setTimeout(60000);

describe('full flow', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  test('register golden flow', async () => {
    const user = userEvent.setup();
    const store = setupStore(notLoggedInStore);

    const { container } = renderWithProviders(
      <ResponsiveContext.Provider value={{ width: 1500 }}>
        <App />
      </ResponsiveContext.Provider>,
      { store }
    );

    const loginRegisterNav = screen.getByText(/login \/ register/i);
    await user.click(loginRegisterNav);

    // go to signup
    const linkToSignUp = await screen.findByText(/have an account?/i);
    expect(linkToSignUp).toBeInTheDocument();

    // after click go to sign up
    await user.click(linkToSignUp);
    expect(linkToSignUp).not.toBeInTheDocument();

    // sign up
    const signUpButton = await screen.findByRole('button', { name: 'Sign Up' });
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

    // after that get redirect to home
    const videos = await screen.findAllByRole('listitem');
    expect(videos).toHaveLength(2);

    const sharedBys = await screen.findAllByText(/shared by: /i);
    for (const sharedBy of sharedBys) {
      expect(sharedBy).toHaveTextContent('abc@gmail.com');
    }

    expect(await screen.findByText(/easy on me/i)).toBeInTheDocument();
    expect(await screen.findByText(/Là Anh - Phạm Lịch/i)).toBeInTheDocument();
  });
});
