# Marck: a mock version of (Py)Spark.

import functools
import operator
import os


class SparkContext(object):
    @staticmethod
    def parallelize(seq):
        return RDD(seq)

    @staticmethod
    def textFile(path):
        return RDD(open(path))

    @staticmethod
    def wholeTextFiles(dirpath):
        return RDD(('file:' + os.path.realpath(os.path.join(dirpath, fname)),
                    open(os.path.join(dirpath, fname)).read())
                   for fname in os.listdir(dirpath))


class SparkConf(object):
    def setAppName(self, name):
        return self

    def setMaster(self, master):
        return self


class RDD(list):
    def __init__(self, items=()):
        super(RDD, self).__init__(items)
        self.is_cached = False

    def cache(self):
        self.is_cached = True
        return self

    def collect(self):
        return list(self)

    def keys(self):
        return self.map(operator.itemgetter(0))

    def map(self, f):
        return RDD(f(x) for x in self)

    def flatMap(self, f):
        return RDD(y for x in self for y in f(x))

    def reduce(self, f):
        return functools.reduce(f, self)

    def reduceByKey(self, f):
        bykey = {}
        for k, v in self:
            bykey.setdefault(k, []).append(v)
        return [(k, reduce(f, v)) for k, v in bykey.items()]

    def sortBy(self, key, ascending=True):
        sortd = RDD(self)
        sortd.sort(key=key, reverse=(not ascending))
        return sortd

    def take(self, n):
        return self[:n]

    def values(self):
        return self.map(operator.itemgetter(1))
