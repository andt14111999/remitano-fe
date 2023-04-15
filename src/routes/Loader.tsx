import { ComponentType, Suspense } from 'react';
import CustomLoader from 'components/CustomLoader';
import IPageConfig from 'types/IPageConfig';

export const Loader = (Component: ComponentType) => (props: IPageConfig) =>
  (
    <Suspense fallback={<CustomLoader />}>
      <Component {...props} />
    </Suspense>
  );
