import React from "react";
import HelpArticle from "./HelpArticle";
import HelpLayout from "./HelpLayout";

import "./HelpPage.less";

export default function HelpDrawerContent({ path, hash, onNavigate }) {
  return (
    <HelpLayout embed currentPath={path} onNavigate={onNavigate}>
      <HelpArticle path={path} hash={hash} onNavigate={onNavigate} />
    </HelpLayout>
  );
}
