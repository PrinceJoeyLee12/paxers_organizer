import React, { lazy, Suspense } from 'react';
import FallBack from '../layouts/FallBack';
const ContactForm = lazy(() => import('./ContactForm'));

const ContactUs = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <ContactForm />
    </Suspense>
  );
};

export default ContactUs;
