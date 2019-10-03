# FaunaDB, 11ty and Netlify Bookmarking site

This repository corresponds to an article on creating your very own bookmarking site with the power of FaunaDB, 11ty and Netlify. When the article is published, I'll update with a link.

## Setup

If you want this for your own, there are a few things you'll need to do, first, deploy this repo to Netlify with the button below (what this does: Forks the repository and then deploys that forked repository to your Netlify account)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/brob/netlify-fauna-bookmarks)


### Requirements

* A FaunaDB account
    * A FaunaDB "Collection" called "links"
* Environment Variables in Netlify
    * FAUNADB_SERVER_SECRET (your server secret from Fauna)
    * API_KEY (a simple API you'll use as a query parameter to confirm it's you posting)
* Netlify Dev CLI `npm install -g netlify-cli`

## Installation and local work

1. `npm install`
2. `netlify dev`

Seriously, that should be all it takes

## Editing

The site files live in the `/src` directory. This is where 11ty will build the site from. It will publish the files to `/app`.

The Lambda Function lives in `/lambda`. The main functions doing the heavy lifting are in `/lambda/bookmarks/create.js`.

## Setting up a shortcut

In the article, I discuss setting up an iOS Shortcut to post to our netlify function (which should live at `http://siteurl.com/.netlify/functions/bookmarks`).

To add a bookmark you send a request with a query parameter structured like this:

`http://siteurl.com/.netlify/functions/bookmarks?url=http://google.com&apiKey=your-api-key`

The article will show you the steps to create the iOS shortcut, but you could also make a small JavaScript bookmarklet to do the same thing.