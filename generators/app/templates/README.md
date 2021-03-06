# <%= className %>

<%= description %>

## Usage

Add both Clappr and the plugin scripts to your HTML:

```html
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
  <script type="text/javascript" src="dist/<%= name %>.min.js"></script>
</head>
```

Then just add `<%= className %>` into the list of plugins of your player instance, and the options for the plugin go in the `<%= confName %>` property as shown below.

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.mp4",
  autoPlay: false,
  plugins: [
    <%= className %>
  ],
  <%= confName %>: {
  }
});
```

## Development

Install dependencies:

```shell
yarn install
```

Start HTTP dev server `http://0.0.0.0:8080`:

```shell
yarn start
```

Upgrade packages to the latest version:

```shell
yarn upgrade --latest
```

## Release

Minified version of plugin will be placed at `dist/<%= name %>.min.js`

```shell
yarn release
```

## Lint

Run linter:

```shell
yarn lint
```

Fix lint errors:

```shell
yarn fix
```
