import { useCallback, useState } from 'react';

/**
 * Custom hook for managing modal visibility state
 * @returns Object with visible state, open and close callbacks
 */
export const useModalState = () => {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  return { visible, open, close };
};
