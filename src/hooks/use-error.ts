import { useState } from 'react';

import { ResponseBase } from '../types/interfaces/api/responses/base';

export const useError = (): [
  Record<string, string>, (_: ResponseBase) => void,
] => {
  const [error, setError] = useState<Record<string, string>>({});

  const errorExtractor = (response: ResponseBase): void => {
    setError(response.error ?? {});
  };

  return [error, errorExtractor];
};
