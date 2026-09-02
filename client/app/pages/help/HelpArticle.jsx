import React, { useCallback, useEffect } from "react";
import Link from "@/components/Link";
import { useHelpManifest, useHelpTopic, groupedTopics } from "./catalog";
import { helpHref, isHelpHref, parseHelpHref } from "./markdown";

function HelpIndex({ onNavigate }) {
  const { status, manifest } = useHelpManifest();
  const groups = groupedTopics(manifest);

  const handleClick = (event) => {
    if (!onNavigate) {
      return;
    }
    event.preventDefault();
    onNavigate(event.currentTarget.getAttribute("href"));
  };

  return (
    <>
      <h1>Help</h1>
      <p className="help-lead">Guides for queries, dashboards, alerts, data sources, and self-hosting.</p>

      {status === "loading" && groups.length === 0 && <div className="help-empty">Loading help topics...</div>}
      {status === "error" && <div className="help-empty">We could not load the help index. Try refreshing.</div>}

      {groups.map((group) => (
        <section key={group.id} className="help-index-group">
          <h2>{group.title}</h2>
          <ul>
            {group.topics.map((topic) => (
              <li key={topic.path}>
                <Link href={helpHref(topic.path)} onClick={onNavigate ? handleClick : undefined}>
                  {topic.title}
                </Link>
                {topic.summary && <span className="help-index-summary"> {topic.summary}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

function HelpTopic({ path, hash, onNavigate }) {
  const { status, topic, html } = useHelpTopic(path);

  const handleBodyClick = useCallback(
    (event) => {
      const anchor = event.target.closest && event.target.closest("a");
      if (!anchor) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const href = anchor.getAttribute("href");
      if (!isHelpHref(href)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (onNavigate) {
        onNavigate(href);
      }
    },
    [onNavigate]
  );

  useEffect(() => {
    if (!hash || status !== "ready") {
      return;
    }
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash, status, html]);

  if (status === "loading") {
    return <div className="help-empty">Loading...</div>;
  }

  if (status === "error") {
    return (
      <>
        <h1>Something went wrong</h1>
        <div className="help-empty">We could not load this article. Try another topic from the menu.</div>
      </>
    );
  }

  if (status === "missing" || !topic) {
    return (
      <>
        <h1>Page not found</h1>
        <p className="help-lead">We do not have a guide for this topic yet.</p>
        <div className="help-empty">
          Pick another topic from the menu, or go back to{" "}
          <Link
            href={helpHref("")}
            onClick={
              onNavigate
                ? (event) => {
                    event.preventDefault();
                    onNavigate(helpHref(""));
                  }
                : undefined
            }
          >
            help home
          </Link>
          .
        </div>
      </>
    );
  }

  return (
    <>
      <p className="help-breadcrumbs">
        <Link
          href={helpHref("")}
          onClick={
            onNavigate
              ? (event) => {
                  event.preventDefault();
                  onNavigate(helpHref(""));
                }
              : undefined
          }
        >
          Help
        </Link>
        {" / "}
        {topic.title}
      </p>
      <h1>{topic.title}</h1>
      {topic.summary && <p className="help-lead">{topic.summary}</p>}
      {html ? (
        <div
          className="help-article-body"
          onClick={onNavigate ? handleBodyClick : undefined}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="help-empty">This article is empty. Pick another topic from the menu.</div>
      )}
    </>
  );
}

export default function HelpArticle({ path, hash, onNavigate }) {
  if (!path) {
    return <HelpIndex onNavigate={onNavigate} />;
  }
  return <HelpTopic path={path} hash={hash} onNavigate={onNavigate} />;
}

export function helpLocationFromHref(href) {
  return parseHelpHref(href);
}
