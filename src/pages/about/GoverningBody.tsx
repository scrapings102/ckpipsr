import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { GoverningBodyLayout } from "../../components/LeadershipSubPages";
import { useGoverningBodyContent } from "../../hooks/useGoverningBodyContent";

export default function GoverningBody() {
  const content = useGoverningBodyContent();

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="Governing Body"
    >
      <GoverningBodyLayout content={content} />
    </SubPageLayout>
  );
}
