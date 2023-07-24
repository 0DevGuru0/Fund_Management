import React from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { Role } from '$service/groups/Role';

const Home: NextPage = () => {
  const userInfo = useUserInfo();
  const router = useRouter();
  const roles = Object.keys(userInfo?.roles);
  React.useEffect(() => {
    if (roles.includes(Role.SystemAdmin)) {
      router.replace('/management/allTask');
    } else if (roles.includes(Role.FundManager)) {
      router.replace('/fundManager/inbox');
    } else if (roles.includes(Role.FundFinancialManager)) {
      router.replace('/fundFinancialManager/inbox');
    } else if (roles.includes(Role.PublisherAdmin)) {
      router.replace('/publisherAdmin/reports');
    } else {
      router.replace('/researcher/overview');
    }
  }, [router, roles]);

  // TODO: implement iknito splash from index
  return <div />;
};

export default Home;
