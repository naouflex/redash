import { useEffect, useState } from "react";
import { HELP_STATIC_BASE, renderMarkdown } from "./markdown";

const MANIFEST_URL = `${HELP_STATIC_BASE}/index.json`;
const EMPTY_MANIFEST = { groups: [], topics: [] };

const cache = new Map();

function fetchOnce(url, asJson) {
  const key = `${asJson ? "json" : "text"}:${url}`;
  if (!cache.has(key)) {
    const promise = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${url} responded with ${response.status}`);
        }
        return asJson ? response.json() : response.text();
      })
      .catch((error) => {
        cache.delete(key);
        throw error;
      });
    cache.set(key, promise);
  }
  return cache.get(key);
}

function getManifest() {
  return fetchOnce(MANIFEST_URL, true);
}

export function useHelpManifest() {
  const [state, setState] = useState({
    status: "loading",
    manifest: EMPTY_MANIFEST,
    error: null,
  });

  useEffect(() => {
    let alive = true;
    getManifest()
      .then((manifest) => {
        if (!alive) {
          return;
        }
        setState({ status: "ready", manifest, error: null });
      })
      .catch((error) => {
        if (!alive) {
          return;
        }
        setState({ status: "error", manifest: EMPTY_MANIFEST, error });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

export function useHelpTopic(path) {
  const [state, setState] = useState({
    status: "loading",
    topic: null,
    html: null,
    error: null,
  });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", topic: null, html: null, error: null });

    getManifest()
      .then((manifest) => {
        const topic = (manifest.topics || []).find((item) => item.path === path);
        if (!topic) {
          if (alive) {
            setState({ status: "missing", topic: null, html: null, error: null });
          }
          return null;
        }
        return fetchOnce(`${HELP_STATIC_BASE}/${topic.file}`, false).then((raw) => {
          if (!alive) {
            return;
          }
          setState({
            status: "ready",
            topic,
            html: renderMarkdown(raw),
            error: null,
          });
        });
      })
      .catch((error) => {
        if (!alive) {
          return;
        }
        setState({ status: "error", topic: null, html: null, error });
      });

    return () => {
      alive = false;
    };
  }, [path]);

  return state;
}

export function groupedTopics(manifest) {
  return (manifest.groups || []).map((group) => ({
    ...group,
    topics: (manifest.topics || []).filter((topic) => topic.group === group.id),
  }));
}
