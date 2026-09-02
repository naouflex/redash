import React, { useEffect } from "react";
import routeWithUserSession from "@/components/ApplicationArea/routeWithUserSession";
import location from "@/services/location";
import routes from "@/services/routes";
import HelpArticle from "./HelpArticle";
import HelpLayout from "./HelpLayout";

import "./HelpPage.less";

function topicPathFromParam(topicPath) {
  if (!topicPath) {
    return "";
  }
  const slug = Array.isArray(topicPath) ? topicPath.join("/") : String(topicPath);
  return slug ? `/${slug.replace(/^\/+/, "")}` : "";
}

export default function HelpPage({ topicPath }) {
  const path = topicPathFromParam(topicPath);
  const hash = location.hash || "";

  useEffect(() => {
    if (!hash || !path) {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [hash, path]);

  return (
    <div className="help-page">
      <div className="container">
        <HelpLayout currentPath={path}>
          <HelpArticle path={path} hash={hash} />
        </HelpLayout>
      </div>
    </div>
  );
}

routes.register(
  "Help.Home",
  routeWithUserSession({
    path: "/help",
    title: "Help",
    render: () => <HelpPage />,
  })
);

routes.register(
  "Help.Topic",
  routeWithUserSession({
    path: "/help/:topicPath+",
    title: "Help",
    render: ({ topicPath }) => <HelpPage topicPath={topicPath} />,
  })
);
