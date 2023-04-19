import { renderWithProviders } from 'test-utils/testStore';
import { logRoles, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from 'stores/store';
import Share from '.';
import { sleep } from 'test-utils';
import { SnackbarProvider } from 'notistack';

describe('Share', () => {
  test('validate input and submit', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Share />
      </SnackbarProvider>
    );

    const signInButton = screen.getByRole('button', { name: 'Share' });
    const videoInput = await screen.findByLabelText(/Youtube URL/i);

    await user.click(signInButton);
    const errorMsg = await screen.findByText('Video URL is required');
    expect(errorMsg).toBeInTheDocument();

    await user.clear(videoInput);
    await user.type(videoInput, 'https://www.youtube.com/watch?v=2cS1OY7pE1w');
    await user.click(signInButton);

    expect(errorMsg).not.toBeInTheDocument();
    expect(await screen.findByText('Share successfully')).toBeInTheDocument();
  });
});
