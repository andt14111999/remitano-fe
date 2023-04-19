import { Context as ResponsiveContext } from 'react-responsive';
import Navbar from '.';
import { renderWithProviders } from 'test-utils/testStore';
import userEvent from '@testing-library/user-event';
import {
  logRoles,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { sleep } from 'test-utils';
import { act } from 'react-dom/test-utils';

describe('Navbar', () => {
  test('mobile click on hamburger', async () => {
    const user = userEvent.setup();
    const { container, unmount } = renderWithProviders(
      <ResponsiveContext.Provider value={{ width: 300 }}>
        <Navbar />
      </ResponsiveContext.Provider>
    );
    logRoles(container);
    // click on hamburger
    const hamburger = await screen.findByRole('img', { name: /hamburger/i });
    await user.click(hamburger);

    // expect navbar to be visible
    const navbarClose = await screen.findByRole('img', { name: /close/i });
    expect(navbarClose).toBeInTheDocument();

    // click on navbar and check if the section have style
    const mobileWrapper = await screen.findByRole('menubar');

    await user.click(navbarClose);
    await sleep(1000);
    expect(mobileWrapper).toHaveStyle({
      opacity: 0,
      transform: 'translateX(100%)',
    });
    unmount();
  });
});
