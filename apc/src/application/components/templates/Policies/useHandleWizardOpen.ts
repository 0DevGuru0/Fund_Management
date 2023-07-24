import { useContext } from 'react';

import { useUpdateAtom } from 'jotai/utils';

import { PoliciesContext } from './PoliciesContext';

const useHandleWizardOpen = (): (() => void) => {
  const { showCreatePolicyWizardAtom } = useContext(PoliciesContext);
  const setWizardOpen = useUpdateAtom(showCreatePolicyWizardAtom);
  return () => setWizardOpen(true);
};

export default useHandleWizardOpen;
