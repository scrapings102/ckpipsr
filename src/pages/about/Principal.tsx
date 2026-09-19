import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { PrincipalLayout } from "../../components/LeadershipSubPages";

export default function Principal() {
  return (
    <SubPageLayout
      title="Principal"
      subtitle="Address and greetings from our Principal, Dr. Dhiren P. Shah."
      category="about-us"
      activeItemLabel="Principal"
    >
      <PrincipalLayout />
    </SubPageLayout>
  );
}
