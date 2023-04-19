import { renderWithProviders } from 'test-utils/testStore';
import CustomSnackbar from '.';
import { screen } from '@testing-library/react';

describe('CustomSnackbar', () => {
  test('success snackbar', async () => {
    const { container, unmount } = renderWithProviders(
      <CustomSnackbar
        id="123"
        message="Test"
        variant="success"
        closeSnackBar={jest.fn()}
      />
    );

    // expect text
    const txt = screen.queryByText('Success');
    expect(txt).toBeInTheDocument();

    // expect img
    const img = screen.getByRole('img', {
      name: /snackbar/i,
    }) as HTMLImageElement;
    expect(img.src).toContain('Toast_Check');
  });

  test('warning snackbar', async () => {
    const { container, unmount } = renderWithProviders(
      <CustomSnackbar
        id="123"
        message="Test"
        variant="warning"
        closeSnackBar={jest.fn()}
      />
    );

    // expect text
    const txt = screen.queryByText('Warning');
    expect(txt).toBeInTheDocument();

    // expect img
    const img = screen.getByRole('img', {
      name: /snackbar/i,
    }) as HTMLImageElement;
    expect(img.src).toContain('Toast_Alert');
  });

  test('error snackbar', async () => {
    const { container, unmount } = renderWithProviders(
      <CustomSnackbar
        id="123"
        message="Test"
        variant="error"
        closeSnackBar={jest.fn()}
      />
    );

    // expect text
    const txt = screen.queryByText('Error');
    expect(txt).toBeInTheDocument();

    // expect img
    const img = screen.getByRole('img', {
      name: /snackbar/i,
    }) as HTMLImageElement;
    expect(img.src).toContain('Toast_Error');
  });
});
