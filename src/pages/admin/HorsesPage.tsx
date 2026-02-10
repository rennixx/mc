import { lazy } from 'react';
import { SEOMeta } from '../../components/common/SEOMeta';

const HorsesManagement = lazy(() => import('../../components/admin/HorsesManagementPage').then(m => ({ default: m.HorsesManagementPage })));

export const HorsesPage = () => {
  return (
    <>
      <SEOMeta
        title="Manage Horses - MAM Admin"
        description="Manage your horses, availability, and details"
      />
      <HorsesManagement />
    </>
  );
};
