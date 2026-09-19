import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { DeansLayout } from "../../components/LeadershipSubPages";

export default function DeansAndFaculty() {
  return (
    <SubPageLayout
      title="Deans and Faculty In-charges"
      subtitle="Academic and administrative leadership at C. K. Pithawalla Institute of Pharmaceutical Science & Research."
      category="about-us"
      activeItemLabel="Deans and Faculty In-charges"
    >
      <DeansLayout />
    </SubPageLayout>
  );
}
