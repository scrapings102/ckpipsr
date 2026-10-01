import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { PrincipalLayout } from "../../components/LeadershipSubPages";
import { usePrincipalContent } from "../../hooks/usePrincipalContent";

export default function Principal() {
  const content = usePrincipalContent();

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="Principal"
    >
      <PrincipalLayout content={content} />
    </SubPageLayout>
  );
}