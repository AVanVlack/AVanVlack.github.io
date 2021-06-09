---
title: New site for a new domain
date: 2021-06-08 09:00:00
tags:
  - Hugo
categories:
  - blog
  - notes
keywords:
  - static site generator
  - github actions
---

## New domain

After switching my personal site to drewvanvlack.com from andrewvanvlack.net I decided to change out my static single page site to a static site generator. I love working with the full stack with dynamic frontends, but make it a lot harder to host and deploy such a small page.

Requirements for the new stack:

- Host with only a statics server.
- Structured system without limiting what can be done with the webstack.
- Fast, organized development workflow and tooling.

## Choosing a generator and the discovery process

Being my first time using a static site generator I did some pre-project research. There were three systems in use:

- Jinkle: Started the static generator movement, built on ruby.
- Hugo: Built on go and very fast.
- Gatsby: Built on React, it's the hip new kid on the block.

As I have fallen in love with Go the last few years I picked Hugo. Though in this case the underlying language/framework is not important for using it as a site generator. But it's always good to be in a position to give back to open source projects via code contributions.

A few standout reasons I picked Hugo:

- Great documentation
- Clean framework structure
- Lightning fast build times
- Good Development tools (cli) and workflow (live reload)

What helped to understand the most was to download a simple theme and dig through the files. The themes are layed out the same as the standard structure and due to the clean workflow it was quite easy to find how things connect. The official documentation along with [Mike Dane's youtube serice](https://www.youtube.com/watch?v=qtIqKaDlqXo&list=PLLAZ4kZ9dFpOnyRlyS-liKL5ReHDcj4G3) where great for understanding smaller details.

## Same git push, with new actions

The last part was a new deployment workflow as the project needed to be compiled, then I would have both the project and static pages to push to github. Not too much to do manually every time, but a local build script could work quite well. But I stumbled upon a new github feature called actions.

With actions we can define a script of well.. actions and github will spin up a container and run those actions automatically on push. Here is the action file I am using for hugo and github pages.

```

name: github pages

on:
 push:
   branches:
     - master # Set a branch to deploy
 pull_request:

jobs:
 deploy:
   runs-on: ubuntu-20.04
   steps:
     - uses: actions/checkout@v2
       with:
         submodules: false # Fetch Hugo themes (true OR recursive)
         fetch-depth: 0 # Fetch all history for .GitInfo and .Lastmod

     - name: Setup Hugo
       uses: peaceiris/actions-hugo@v2
       with:
         hugo-version: "latest"
         extended: true

     - name: Build
       run: hugo --minify

     - name: Deploy
       uses: peaceiris/actions-gh-pages@v3
       if: github.ref == 'refs/heads/master'
       with:
         github_token: ${{ secrets.GITHUB_TOKEN }}
         publish_dir: ./public

```

Some of the workflow is hidden behind other scripts but let me walk you through it. On push to the master branch we spin up a ubuntu container. We clone and checkout submodules for the respiratory we just pushed. Setup the latest version of hugo, build using hugo. Lastly we push the compiled static site to the gh-pages branch. From there we can server the site with github pages.

Now all we need to do is push our project just as if it were the static site. Simple, fast, and clean.

**Thanks for reading my first technical blog post. I hope to continue posting and improving on my technical writing. If you have any comments send me an email at [a.vanvlack@gmail.com](mailto:a.vanvlack@gmail.com)**
