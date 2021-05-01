import React, { Suspense } from 'react';

import FallBack from '../layouts/FallBack';
const NotFound = React.lazy(() => import('./NotFound'));

const NotFoundIndex = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <NotFound />
    </Suspense>
  );
};

export default NotFoundIndex;
