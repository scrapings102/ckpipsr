import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { DeansLayout } from "../../components/LeadershipSubPages";
import { useDeansContent } from "../../hooks/useDeansContent";

export default function DeansAndFaculty() {
  const content = useDeansContent();

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="Deans and Faculty In-charges"
    >
      <DeansLayout content={content} />
    </SubPageLayout>
  );
}
