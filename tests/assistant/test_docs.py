from unittest import TestCase

from rewatch.assistant import docs


class TestHelpDocsCatalog(TestCase):
    def test_search_finds_query_topics(self):
        results = docs.search_docs("parameter", "https://app.example.com")
        self.assertTrue(results)
        self.assertTrue(any("parameter" in item["title"].lower() or "parameter" in item["path"] for item in results))
        self.assertTrue(all(item["url"].startswith("https://app.example.com/help/") for item in results))

    def test_get_docs_topic_includes_article_body(self):
        topic = docs.get_docs_topic("getting_started", "https://app.example.com")
        self.assertEqual(topic["title"], "Getting Started")
        self.assertEqual(topic["url"], "https://app.example.com/help/user-guide/getting-started")
        self.assertIn("data source", topic["content"].lower())

    def test_unknown_topic_raises(self):
        with self.assertRaises(ValueError):
            docs.get_docs_topic("not_a_real_topic", "https://app.example.com")
