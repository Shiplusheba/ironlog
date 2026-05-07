# IronLog

Workout tracker that lives in a single HTML file. I got tired of apps that want a subscription to log a squat, so I built this.

**Demo:** https://shiplusheba.github.io/ironlog/

---

Built as a PWA so it installs on your phone and works offline. Data syncs to a private GitHub repo so it isn't stuck in one browser.

## What it does

Logs workouts set by set - weight, reps, optional note per set. You can mark warm-up sets separately. Starting from a template pre-fills the exercise list; you can add, remove, or reorder on the fly.

There's a muscle recovery view that tracks how long ago each muscle group was trained and flags what's ready to go again. An advisor compares your last two sessions of each exercise and nudges you to add weight or reps when you've stalled.

Past workouts are fully editable - times, exercises, individual sets, everything.

## Getting it running

Fork the repo (or just download the 6 files), then:

1. Go to repo **Settings → Pages → Deploy from a branch → main / root → Save**
2. Your copy is live at `https://YOUR-USERNAME.github.io/ironlog/` in about a minute
3. Open it in Chrome on your phone and tap **Add to Home screen**

That's it. No build step, no npm install, no config files.

## Data sync (optional but recommended)

By default data lives in localStorage, which ties it to one browser. To make it permanent:

1. Create a **private** GitHub repo called `ironlog-data`
2. Generate a personal access token with `repo` scope (GitHub → Settings → Developer settings → Personal access tokens → Classic)
3. Open the app → **☁ Sync** tab → fill in your username, both repo names, and the token

After that it pushes to the private repo automatically. The app repo stays public, the data repo stays private.

## Customising the exercise library

The library and templates are plain arrays near the top of `index.html`- `const LIBRARY` and `const BUILT_IN_TEMPLATES`. Edit them in any text editor and re-upload. The structure is pretty self-explanatory once you look at a few entries.

## Stack

Vanilla HTML/CSS/JS, no frameworks, no build tools. The whole thing is one file. Service worker handles offline caching.

## License

MIT
