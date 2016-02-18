from marck import SparkContext
from program import Compose, count_unique, tokenize

from nose.tools import assert_equal


sc = SparkContext()


DOCS = ["Hello, world!", "document 2"]


def test_tokenize():
    tok = tokenize(sc.parallelize(DOCS))
    assert_equal(tok, ["Hello,", "world!", "document", "2"])


def test_pipeline():
    docs = sc.parallelize(DOCS)

    tokens = count_unique(tokenize(docs))
    expect = sorted((w, 1) for w in ["Hello,", "world!", "document", "2"])
    assert_equal(sorted(tokens), expect)

    c = Compose(tokenize, count_unique)
    assert_equal(sorted(c(docs)), expect)
