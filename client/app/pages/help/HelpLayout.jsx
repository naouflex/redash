import React, { useEffect, useState } from "react";
import cx from "classnames";
import PlainButton from "@/components/PlainButton";
import HelpSidebar from "./HelpSidebar";

export default function HelpLayout({ children, currentPath, embed = false, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const sidebarId = embed ? "help-sidebar-embed" : "help-sidebar-mobile";

  return (
    <div className={cx("help-layout", { "help-layout--embed": embed })}>
      {!embed && <HelpSidebar currentPath={currentPath} />}

      <main className={cx("help-content", { "help-content--embed": embed })}>
        <div className={cx("help-menu-bar", embed ? "help-menu-bar--embed" : "help-menu-bar--mobile")}>
          <PlainButton
            className="help-menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls={sidebarId}
            aria-label="Open help topics menu"
          >
            <span className="help-menu-toggle__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>{embed ? "Menu" : "Help topics"}</span>
          </PlainButton>
        </div>
        {children}
      </main>

      {menuOpen && (
        <div className="help-menu-overlay" role="dialog" aria-modal="true" aria-label="Help topics">
          <PlainButton
            className="help-menu-overlay__backdrop"
            aria-label="Close help topics menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="help-menu-overlay__panel">
            <div className="help-menu-overlay__header">
              <strong>Help topics</strong>
              <PlainButton
                className="help-menu-overlay__close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close help topics menu"
              >
                ×
              </PlainButton>
            </div>
            <div className="help-menu-overlay__body">
              <HelpSidebar
                idPrefix={sidebarId}
                currentPath={currentPath}
                onNavigate={(href, event) => {
                  setMenuOpen(false);
                  if (onNavigate) {
                    event.preventDefault();
                    onNavigate(href);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
