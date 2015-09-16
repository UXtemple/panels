# panels by UXtemple

A runtime to run panels apps.

[![Circle CI](https://circleci.com/gh/UXtemple/panels.svg?style=svg)](https://circleci.com/gh/UXtemple/panels)

**WIP**.
**TODO** update this doc to reflect the reality :).

[Use panels](https://usepanels.com).

1. **Routing**.

panels stands for an interconnected web.
URIs have worked as paths for documents, pages and apps ever since the Internet begun.

panels takes this concept even further by embedding URIs within URIs, e.g.:
- `https://usepanels.com/` points to the `/` panel in the `usepanels.com` app.
- `https://usepanels.com/in/https://UXtemple.com/` refers to `/` and `/in` in `usepanels.com` and
`/` in `UXtemple.com`.

We call the latter teleports. That's a native concept to panels and embraces a new web.

2. **App mapping**.

Before we can place any panel in our deck we need to know what they look like. Apps tell us that.

Essentially, each domain is an app. So `usepanels.com`, `UXtemple.com` and `random-stuff.UXtemple.com`
are all separate apps.
*TODO* explain app aliasing.
The overhead of setting up an app very little and thus panels encourages app splitting.

In order for an app to work it must define the following:
- which panels it supports:
an object describing your panels structure by path.

- which types it defines:
the [React](http://facebook.github.io/react/) views that power your panels.

- its context:
a set of [redux](https://github.com/rackt/redux) reducers that hold the app's state and cater
for its transformations.
*TODO* expand on the JavaScript and its structure.

We're leveraging [browserify's external requires](https://github.com/substack/node-browserify#external-requires)
to package our apps.
*TODO* expand on `panelise`.
Once packaged an app can be exposed as a regular JavaScript file in a web server called `panels.js`.
So, for `usepanels.com`, the panels definition lives at `usepanels.com/panels.js`.

The app mapper makes sure apps are loaded on demand whenever a URI needs them.
