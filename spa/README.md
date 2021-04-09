# Single Page Application (SPA) Module
Built with:
- React
- React Router
- Sass

## Aliases
The common Webpack config for this projects has a couple aliases defined for convenience. These aliases are only available in `import` statements within the React application

The `spa` folder itself can be accessed via `SPA`.

The `components` folder can be accessed via `Components`.

The `routes` folder can be accessed via `Routes`.

## Components
Prefer the usage of functional components and hooks.

## Routing
Routing and pages are handled in the `routes` folder.

`routes/index.js` is where routing logic is handled. Note that the `Header` and `Footer` components are positioned above and below the main routing content area by default.

Each folder within `routes` should be used as a container for each page layout. For example, `routes/_root/index.js` contains the component which will display on the root domain. `routes/About/index.js` defines the `/About` page component. Deeper nesting of routes can be achieved with React Router, as is seen in `routes/Topics/index.js`, which may warrant further nesting of route folders.

## Styles
Currently, there is no fancy library which is tying styles into our React components. Sass files are supported via Webpack and can be directly imported to each component. Additionally, you can add files to the `scss` folder and import them into `sass/index.scss` to be loaded into the root of the application.
