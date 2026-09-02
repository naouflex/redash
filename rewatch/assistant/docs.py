"""Help documentation catalog for the assistant."""

from __future__ import annotations

import json
import os
import re
from functools import lru_cache
from typing import Any

# Stable topic ids used by tool prompts. Values are paths under /help.
TOPIC_ALIASES: dict[str, str] = {
    "getting_started": "/user-guide/getting-started",
    "queries": "/user-guide/querying",
    "dashboards": "/user-guide/dashboards",
    "alerts": "/user-guide/alerts",
    "alert_setup": "/user-guide/alerts/setting-up-an-alert",
    "query_parameters": "/user-guide/querying/query-parameters",
    "visualizations": "/user-guide/visualizations",
    "permissions": "/user-guide/querying/writing-queries",
    "data_sources": "/data-sources/querying-urls",
    "ml_models": "/user-guide/machine-learning",
}

_FRONTMATTER = re.compile(r"^---\r?\n[\s\S]*?\r?\n---\r?\n?")


def _content_dirs() -> list[str]:
    here = os.path.abspath(os.path.dirname(__file__))
    repo_root = os.path.normpath(os.path.join(here, "..", ".."))
    return [
        os.path.join(repo_root, "client", "app", "pages", "help", "content"),
        os.path.join(repo_root, "client", "dist", "help"),
    ]


@lru_cache(maxsize=1)
def _load_manifest() -> tuple[str | None, dict[str, Any]]:
    for directory in _content_dirs():
        index_path = os.path.join(directory, "index.json")
        if os.path.isfile(index_path):
            with open(index_path, encoding="utf-8") as handle:
                return directory, json.load(handle)
    return None, {"groups": [], "topics": []}


def _strip_frontmatter(raw: str) -> str:
    return _FRONTMATTER.sub("", raw, count=1).strip()


def _topic_body(directory: str | None, topic: dict[str, Any]) -> str | None:
    if not directory or not topic.get("file"):
        return None
    path = os.path.join(directory, topic["file"])
    if not os.path.isfile(path):
        return None
    with open(path, encoding="utf-8") as handle:
        return _strip_frontmatter(handle.read())


def _help_url(help_base_url: str, path: str) -> str:
    return f"{help_base_url.rstrip('/')}/help{path}"


def _all_topics() -> list[dict[str, Any]]:
    _, manifest = _load_manifest()
    return list(manifest.get("topics") or [])


def _find_topic(topic_id: str) -> tuple[str, dict[str, Any] | None]:
    path = TOPIC_ALIASES.get(topic_id, topic_id)
    if not path.startswith("/"):
        path = f"/{path}"
    for topic in _all_topics():
        if topic.get("path") == path:
            return path, topic
    return path, None


def search_docs(query: str, help_base_url: str) -> list[dict[str, Any]]:
    needle = query.lower()
    results = []
    for topic in _all_topics():
        haystack = f"{topic.get('title', '')} {topic.get('summary', '')} {topic.get('path', '')} {topic.get('group', '')}".lower()
        if needle not in haystack:
            continue
        path = topic["path"]
        alias = next((key for key, value in TOPIC_ALIASES.items() if value == path), path.lstrip("/"))
        results.append(
            {
                "id": alias,
                "title": topic["title"],
                "summary": topic.get("summary") or "",
                "url": _help_url(help_base_url, path),
            }
        )
    if results:
        return results

    for key, path in TOPIC_ALIASES.items():
        title = key.replace("_", " ").title()
        haystack = f"{key} {title} {path}".lower()
        if needle in haystack:
            results.append(
                {
                    "id": key,
                    "title": title,
                    "summary": "",
                    "url": _help_url(help_base_url, path),
                }
            )
    return results


def get_docs_topic(topic_id: str, help_base_url: str) -> dict[str, Any]:
    directory, _manifest = _load_manifest()
    path, topic = _find_topic(topic_id)
    if not topic:
        alias_path = TOPIC_ALIASES.get(topic_id)
        if alias_path:
            return {
                "id": topic_id,
                "title": topic_id.replace("_", " ").title(),
                "summary": "",
                "url": _help_url(help_base_url, alias_path),
            }
        available = ", ".join(sorted(set(TOPIC_ALIASES) | {item["path"] for item in _all_topics()}))
        raise ValueError(f"Unknown topic {topic_id!r}. Available: {available}")

    result = {
        "id": topic_id,
        "title": topic["title"],
        "summary": topic.get("summary") or "",
        "url": _help_url(help_base_url, path),
    }
    body = _topic_body(directory, topic)
    if body:
        result["content"] = body
    return result
