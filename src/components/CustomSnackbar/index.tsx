import React, { FC } from 'react';
import { SnackbarContent, SnackbarKey, SnackbarMessage } from 'notistack';
import { Cancel } from '@mui/icons-material';
import images from 'assets';

const ICONS = {
  success: images.toast.check,
  warning: images.toast.warning,
  error: images.toast.error,
};

const TEXT_COLORS = {
  success: 'text-green-100',
  warning: 'text-yellow-100',
  error: 'text-red-100',
};

const TITLES = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

interface CustomSnackbarProps {
  id: SnackbarKey;
  message: SnackbarMessage;
  variant?: 'success' | 'error' | 'warning';
  closeSnackBar: () => void;
}

const CustomSnackbar = React.forwardRef<HTMLDivElement, CustomSnackbarProps>(
  ({ id, message, variant, closeSnackBar }, ref) => {
    return (
      <>
        <div
          className={`flex items-center justify-between gap-x-3 p-4 rounded-3xl w-[full] md:w-[25rem] shadow-2xl transition-all bg-purple-700 toast-in-right`}
          key={id}
          ref={ref}
        >
          <div className="flex items-center justify-between gap-x-3">
            <div className="flex-shrink-0 p-[0.625rem] rounded-2xl bg-ink-05">
              <img
                className="w-8"
                src={variant && ICONS[variant]}
                alt="Remitano Snackbar"
              />
            </div>
            <div>
              <p
                className={`mb-1 font-bold ${variant && TEXT_COLORS[variant]}`}
              >
                {variant && TITLES[variant]}
              </p>
              <p className="text-white text-sm font-semibold">{message}</p>
            </div>
          </div>
          <button onClick={closeSnackBar}>
            <Cancel className="text-white" />
          </button>
        </div>
      </>
    );
  }
);

export default CustomSnackbar;
