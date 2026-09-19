import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { GoverningBodyLayout } from "../../components/LeadershipSubPages";

export default function GoverningBody() {
  return (
    <SubPageLayout
      title="Governing Body"
      subtitle="The supreme executive body of C. K. Pithawalla Institute of Pharmaceutical Science & Research."
      category="about-us"
      activeItemLabel="Governing Body"
    >
      <GoverningBodyLayout />
    </SubPageLayout>
  );
}
