import React from 'react'
import { OrgControl } from './_components/OrgControl';

function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return <>
           <OrgControl />
           {children}
	    </>;
}

export default OrganizationLayout;