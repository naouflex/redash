import React from "react";
import cx from "classnames";
import Link from "@/components/Link";
import { useHelpManifest, groupedTopics } from "./catalog";
import { helpHref } from "./markdown";

export default function HelpSidebar({ currentPath, onNavigate, idPrefix = "help-sidebar" }) {
  const { manifest } = useHelpManifest();
  const groups = groupedTopics(manifest);

  const handleClick = (event) => {
    if (typeof onNavigate === "function") {
      onNavigate(event.currentTarget.getAttribute("href"), event);
    }
  };

  return (
    <aside className="help-sidebar" aria-label="Help navigation" id={idPrefix}>
      <div className="help-sidebar__group">
        <h4 className="help-sidebar__title">Overview</h4>
        <ul className="help-sidebar__list">
          <li>
            <Link
              href={helpHref("")}
              onClick={onNavigate ? handleClick : undefined}
              className={cx("help-sidebar__link", { "is-active": !currentPath })}
            >
              Help home
            </Link>
          </li>
        </ul>
      </div>
      {groups.map((group) => (
        <div key={group.id} className="help-sidebar__group">
          <h4 className="help-sidebar__title">{group.title}</h4>
          <ul className="help-sidebar__list">
            {group.topics.map((topic) => (
              <li key={topic.path}>
                <Link
                  href={helpHref(topic.path)}
                  onClick={onNavigate ? handleClick : undefined}
                  className={cx("help-sidebar__link", { "is-active": topic.path === currentPath })}
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
