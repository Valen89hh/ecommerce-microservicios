'use client';

import { useSearchParams } from 'next/navigation';

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type')
  const message = searchParams.get('message'); // obtiene el valor de ?error=...

  return (
    <div>
      <h1>{type} Error</h1>
      {message && <p>Detalles del error: {message}</p>}
    </div>
  );
};

export default ErrorPage;
