# axhxrx-nx-esm-fuckery stream-of-conciousness weekend project recap

2024-06-09 @protiev: This is just an experimental repo to try to figure out all the stuff that breaks when you change your Nx monorepo's `package.json` to have `"type": "module"` for full-on raw-dog ESM action.

### TL;DR: bro, so much stuff breaks

My initial experiment built a normal Nx monorepo with a buildable lib, non-buildable lib, node app, jest tests, e2e tests, and **then** tried to make that change.

So much shit broke, that I never recovered. It was a cascade of redonkulous errors (and I now really wish I recorded it, but I didn't).

So anyway, this time I started with `npx create-nx-workspace@latest` and then immediately added the `"type": "module"` to the `package.json` of the workspace root.

From there, I tried adding shit and making it work: a lib, a node app, a JSR package dependency, then finally an Angular app.

And that is what I have working at the moment:

- `axhxrx-nx-esm-fuckery` — Node app that builds with `@nx/esbuild:esbuild` (by running `nx build axhxrx-nx-esm-fuckery`) and can then be run with `nx serve axhxrx-nx-esm-fuckery` or `node dist/apps/axhxrx-nx-esm-fuckery/main.js`. This app imports from both the local monorepo library and the JRS package and uses them both.

- `nx-buildable-esbuild-lib` — Buildable lib (`@nx/esbuild:esbuild`) that can be imported by the node app and the Angular app. Build with `nx build nx-buildable-esbuild-lib` and test with `nx test nx-buildable-esbuild-lib` (which uses `vitest` and not (**absolutely fucking not**) `jest`). I couldn't get any Jest shit to work at all, and even having Jest config made Nx crash when it tried to do various operations.

- JSR dependency: This was kind of the point of this exercise, to get a [JSR package](https://jsr.io/@axhxrx/date) working in an Nx monorepo, for which the big `"type": "module"` break with the legacy commonjs shit was a prerequisite. To add the dependency, I did `npx jsr add @axhxrx/date` and then I import it in the node/angular contexts like `import * as mod from "@axhxrx/date";` and use it like `const foDate = mod.dateToIS08601WithTimeZoneOffset()`. 

- Bonus 🌮🌮🌮 → an Angular app, creatively named `angular-app` just because that broke so many different ways in my previous try. This app was generated in the normal way with Nx — except **disabling** the Jest test stuff. It imports both the monorepo lib and the JSR package and uses them without any apparent bed-shitting.

It's Sunday night here in Stockholm, and I gotta go back to my weekday job driving trucks, so I'm just leaving this repo here as an artifact. There might still be shit that is broken which I have not had time to notice, and I might have changed more shit than I actually needed to, to get this to work.

I might never get around to revisiting this, since there seems to still be a pretty big impedance mismatch between Nx and ESM so like maybe it's more of a "gravel and lard" thing than "chocolate and peanut butter" thing. 

We'll see! Or we won't. That's the beautiful thing about life. Either shit happens, or it doesn't, but definitely one of those.

## 🚚💨

```text
└[~/axhxrx-nx-esm-fuckery]> nx clear-cache

 NX   Resetting the Nx cache and stopping the daemon.



 NX   Successfully reset the Nx workspace.

┌[protiev@fed-40-container] [/dev/pts/9] [main] 
└[~/axhxrx-nx-esm-fuckery]> nx build nx-buildable-esbuild-lib

> nx run nx-buildable-esbuild-lib:build


———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 NX   Successfully ran target build for project nx-buildable-esbuild-lib (521ms)

┌[protiev@fed-40-container] [/dev/pts/9] [main] 
└[~/axhxrx-nx-esm-fuckery]> nx test nx-buildable-esbuild-lib

> nx run nx-buildable-esbuild-lib:test

 Vitest  "cache.dir" is deprecated, use Vite's "cacheDir" instead if you want to change the cache director. Note caches will be written to "cacheDir/vitest"

 RUN  v1.6.0 /home/protiev/axhxrx-nx-esm-fuckery/libs/nx-buildable-esbuild-lib

 ✓ src/lib/nx-buildable-esbuild-lib.spec.ts (2)
   ✓ nxBuildableEsbuildLib (2)
     ✓ should work
     ✓ should work in apps

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  10:43:42
   Duration  336ms (transform 72ms, setup 0ms, collect 17ms, tests 1ms, environment 0ms, prepare 151ms)


———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 NX   Successfully ran target test for project nx-buildable-esbuild-lib (710ms)

┌[protiev@fed-40-container] [/dev/pts/9] [main] 
└[~/axhxrx-nx-esm-fuckery]> nx build axhxrx-nx-esm-fuckery               

   ✔  1/1 dependent project tasks succeeded [1 read from cache]

   Hint: you can run the command with --verbose to see the full dependent project outputs

———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


> nx run axhxrx-nx-esm-fuckery:build:production


———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 NX   Successfully ran target build for project axhxrx-nx-esm-fuckery and 1 task it depends on (518ms)

Nx read the output from the cache instead of running the command for 1 out of 2 tasks.

┌[protiev@fed-40-container] [/dev/pts/9] [main] 
└[~/axhxrx-nx-esm-fuckery]> nx serve axhxrx-nx-esm-fuckery

> nx run axhxrx-nx-esm-fuckery:serve:development

[ watch ] build succeeded, watching for changes...
Debugger listening on ws://localhost:9229/fe26890c-7989-438a-b83e-527934baf05e
Debugger listening on ws://localhost:9229/fe26890c-7989-438a-b83e-527934baf05e
For help, see: https://nodejs.org/en/docs/inspector

Hello Bob Animal {
  born: '2024-06-09T10:44:28+00:00',
  name: 'Bob',
  age: 10,
  species: 'humans'
} 2024-06-09T10:44:28+00:00

 NX  Process exited with code 0, waiting for changes to restart...

^C%                                                                                                                                             
┌[protiev@fed-40-container] [/dev/pts/9] [main] [130]
└[~/axhxrx-nx-esm-fuckery]> nx serve angular-app             

> nx run angular-app:serve:development

Initial chunk files | Names         |  Raw size
polyfills.js        | polyfills     |  88.34 kB | 
main.js             | main          |  34.79 kB | 
styles.css          | styles        | 112 bytes | 

                    | Initial total | 123.25 kB

Application bundle generation complete. [0.613 seconds]

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
^C%                                                                                                                                             
┌[protiev@fed-40-container] [/dev/pts/9] [main] [130]
└[~/axhxrx-nx-esm-fuckery]> # that works too... it imports both the monorepo library and the JRS package and uses them        
┌[protiev@fed-40-container] [/dev/pts/9] [main] [130]
└[~/axhxrx-nx-esm-fuckery]> # that works too... it imports both the monorepo library and the JRS package and uses them
┌[protiev@fed-40-container] [/dev/pts/9] [main ⚡] [130]
```

----

# AxhxrxNxEsmFuckery

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Start the application

Run `npx nx serve axhxrx-nx-esm-fuckery` to start the development server. Happy coding!

## Build for production

Run `npx nx build axhxrx-nx-esm-fuckery` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
