import MarkdownIt from "markdown-it";
import attrs from "markdown-it-attrs";
import sanitize from "@/services/sanitize";

export const HELP_STATIC_BASE = "/static/help";

function slugify(text) {
  return String(text)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function headingIds(md) {
  const defaultRender =
    md.renderer.rules.heading_open ||
    function renderHeading(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.heading_open = function renderHeadingWithId(tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (!token.attrGet("id")) {
      const inline = tokens[idx + 1];
      const text = inline && inline.children
        ? inline.children
            .filter(child => child.type === "text" || child.type === "code_inline")
            .map(child => child.content)
            .join("")
        : "";
      if (text) {
        token.attrSet("id", slugify(text));
      }
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
})
  .use(attrs)
  .use(headingIds);

export function stripFrontmatter(raw) {
  if (typeof raw !== "string") {
    return "";
  }
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length) : raw;
}

function rewriteHelpUrls(html) {
  return html
    .replace(/(src|href)="\/content\/help\//g, `$1="${HELP_STATIC_BASE}/`)
    .replace(/src="\/help\/assets\//g, `src="${HELP_STATIC_BASE}/assets/`);
}

export function renderMarkdown(raw) {
  const body = stripFrontmatter(raw);
  return sanitize(rewriteHelpUrls(md.render(body)));
}

export function helpHref(topicPath, hash) {
  const path = (topicPath || "").replace(/\/$/, "");
  const href = path ? `help${path}` : "help";
  return hash ? `${href}#${hash}` : href;
}

export function parseHelpHref(href) {
  if (!href) {
    return { path: "", hash: "" };
  }
  const [rawPath, hash = ""] = href.split("#");
  const pathOnly = rawPath.replace(/^https?:\/\/[^/]+/i, "");
  const rest = pathOnly.replace(/^\/?help\/?/, "").replace(/\/$/, "");
  return { path: rest ? `/${rest}` : "", hash };
}

export function isHelpHref(href) {
  if (!href) {
    return false;
  }
  if (href.startsWith("/help") || href.startsWith("help/") || href === "help") {
    return true;
  }
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin && /^\/help(\/|$)/.test(url.pathname);
  } catch (error) {
    return false;
  }
}
