import { renderWithProviders } from 'test-utils/testStore';
import { logRoles, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from 'stores/store';
import constants from 'constants-custom';
import Home from '.';

describe('Home', () => {
  test('renders successfully', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Home />);

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
