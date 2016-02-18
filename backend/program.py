import operator


action_by_intype = {}

_all_actions = set()


class action(object):
    def __init__(self, intype, outtype):
        self.intype = intype
        self.outtype = outtype

    def __call__(self, func):
        if func.__name__ in _all_actions:
            raise RuntimeError("an action called %r was already registered"
                               % func.__name___)
        _all_actions.add(func.__name__)

        action_by_intype.setdefault(self.intype, []).append(func)

        def f(*args, **kwargs):
            return func(*args, **kwargs)
        f.intype = self.intype
        f.outtype = self.outtype

        return f


class Compose(object):
    def __init__(self, f, g):
        if f.outtype != g.intype:
            raise TypeError("input type %r doesn't match required type %r"
                            % (f.outtype, g.intype))

        self.f = f
        self.g = g
        self.intype = f.intype
        self.outtype = g.outtype

    def __call__(self, input):
        return self.g(self.f(input))


@action("str", "int")
def count_unique(data):
    seen_once = data.map(lambda x: (x, 1))
    return seen_once.reduceByKey(operator.add)


@action("rawstr", "str")
def tokenize(data):
    return data.map(lambda s: s.split()).flatMap(list)
