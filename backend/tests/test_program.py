from marck import SparkContext
from program import Compose, flatten, tokenize

from nose.tools import assert_equal


sc = SparkContext()


DOCS = ["Hello, world!", "document 2"]


def test_tokenize():
    tok = tokenize(sc.parallelize(DOCS))
    assert_equal(tok, [["Hello,", "world!"], ["document", "2"]])


def test_pipeline():
    docs = sc.parallelize(DOCS)

    tokens = flatten(tokenize(docs))
    assert_equal(tokens, ["Hello,", "world!", "document", "2"])

    c = Compose(tokenize, flatten)

    tokens2 = c(docs)
    assert_equal(tokens2, tokens)
