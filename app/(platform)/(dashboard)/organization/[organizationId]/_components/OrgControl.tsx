'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useOrganizationList } from '@clerk/nextjs';

export const OrgControl = () => {
  const params = useParams();
  const { organizationId } = params;
  const {  setActive } = useOrganizationList();
  useEffect(() => {
    if (!setActive) return;
    setActive({ organization: organizationId as string });
  }, [setActive,organizationId]);
  return null;
}