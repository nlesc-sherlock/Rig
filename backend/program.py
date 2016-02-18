import operator


action_by_intype = {}

_all_actions = set()


class Action(object):
    def __init__(self, name, func, inbasetype, functype, outbasetype):
        if name in _all_actions:
            raise RuntimeError("an action called %r was already registered"
                               % name)
        _all_actions.add(name)

        self.name = name
        self.func = func
        self.functype = functype
        self.inbasetype = inbasetype
        self.outbasetype = outbasetype

        action_by_intype.setdefault(self.inbasetype, []).append(self)

    def __call__(self, input):
        return getattr(input, self.functype)(self.func)

    def outtype(self):
        if self.functype == "map":
            return self.outbasetype
        if self.functype == "flatMap":
            return (self.outbasetype,)


class Compose(object):
    def __init__(self, f, g):
        if f.outtype() != g.inbasetype:
            raise TypeError("input type %r doesn't match required type %r"
                            % (f.outtype(), g.inbasetype))

        self.f = f
        self.g = g

    def __call__(self, input):
        return self.g(self.f(input))


flatten = Action("flatten", list, "str", "flatMap", "str")

tokenize = Action("tokenize", operator.methodcaller('split'),
                  "rawstr", "map", "str")
