---
date: "2020-09-15"
title: "Why Gatsby?"
description: "Static site generators like Gatsby are fast becoming the norm, and for good reason.  Here are 6 reasons why Gatsby is a great tool for producing excellent websites and apps."
category: "Gatsby"
cover: "./gatsby.png"
coverAlt: "Gatsby.js logo"
tags:
  - "Gatsby"
  - "JavaScript"
  - "React"
  - "Graphql"
---

##### Behold the paradigm shift that is Static Site Generators. Gatsby is great way to start building tomorrows websites today.

Catchy, right? Truth is, static site generators have been around for a while now. Gatsby is one of the most popular, and provides all the tools for building a high quality product.

### What is Gatsby?

Gatsby is a static site generator, that uses React and Graphql. Perhaps a little daunting if you've never used either of those tools, but it's a great place to start learning. You may think, "Why bother?". This post may peek your interest.

If you've never heard of Gatsby, but you are familiar with Wordpress, these are some key points that may help to explain.

![take-away sign](/takeout.png)

#### 1. The take-away Order

You're hungry and you want to phone out for some food. You phone your favourite Indian restaurant and give your order. They take the order to the kitchen, cook it, and a while later it's delivered to your door. With Wordpress, you click on a link, '...somewebsite.com/blog/massala', for example. Wordpress takes that order, has a look through the database for the content, runs it through a page template, sticks on some navigation and footer for garnish, and eventually delivers the html to the user. With Gatsby, the cooking has already been done, so when you phone up, all that happens is the delivery, which can be very very fast!

Taking this as a core principle, pages are generated so that the html will render as quickly as possible, staging all the other necessary things in order of importance. For example and e-commerce site would load all the product page, meanwhile make an API call to the shop to find out if the item is in stock.

> Gatsby loads only critical parts of the page, so your site loads as fast as possible. Once loaded, Gatsby pre-fetches resources for other pages so that clicking on the site feels incredibly fast. Gatsby lets teams focus on creating content-driven websites instead of worrying about performance.

#### 2. Plugin Baby

So many websites suffer plugin bloat that can harm your sites speed, and from time to time just break it completely, all on it's own with out you touching it.

Firstly, bloat needn't be such an issue with Gatsby. Not to say that it's not an issue at all, increasing the number of plugins will increase the complexity of your site, lead to larger JavaScript bundles and increase you build time. But it won't effect that initial page load speed and shouldn't harm your users experience of visiting the site.

Secondly, Gatsby is a JavaScript based framework, so uses NPM or YARN to manage it's dependencies. This means that it won't update anything without your say so, and the dreaded white screen of doom is a thing of the past. If you have a reliance on a 3rd party API, they may deprecate and so you will have to maintain and update as needed. But this can all be done in a controlled way.

#### 3. High Standards

Gatsby uses React components as the building blocks for you to build with. When you include an image, you import the Img component from the ['gatsby-image'](https://www.gatsbyjs.com/plugins/gatsby-image/) node module. This will output the best bloody image component you will ever see. Source sets for different screen sizes, multiple formats, blur-up effects, lazy-loading and the list goes on.

The Link component is part of Gatsby core, which enables pre-fetching, tab-selection and accessibility considerations.

In a nutshell, the idea is to have an open source community, building the highest performing components, to implemented easily, for fantastic websites and apps.

> Gatsby automates code splitting, image optimization, inlining critical styles, lazy-loading, prefetching resources, and more to ensure your site is fully optimized. **No manual tuning required**.

#### 4. PWA? I knew you were going to say that

You don't have to include [this](gatsbyjs.com/plugins/gatsby-plugin-offline/) plugin. But it's very easy if you do want to, and there's very little set up.

Progressive Web Apps have been around for ages, but didn't catch on for quite some time. Probably because they were a bit of a pain to set up, and the thought of caching a lot of data on a users phone seemed a bit harsh. Now that technology has come on so far phones have huge memory capacities and it's the transfer of data that is the biggest concern.

Imagine the scenario from before, when you phone out for food. Well instead of the restaurant giving you a time for delivery, they tell you it's all ready in your kitchen, all plated up and ready to eat. That's the kind of service everyone should be pleased to offer. Of course it's the same order that you placed the last time, but you can nibble on it until the updated one gets to you.

#### 5. Security

Imaging the take-away analogy again (starting to wear thin, I know). Imagine in the Kitchen is where all the secret ingredients and recipes are stored. Well with Gatsby, there is no kitchen (sorry Spongebob) for malicious threats to try to spy on.

![Plankton stealing the secret formula](/plankton.jpg)

> Gatsby’s serverless rendering generates static HTML at build time. No server and no reachable database equals no malicious requests, DDOS attacks, or accidental exposure. A Gatsby site’s attack surface is non-existent.

#### 6. Scalability

That poor take-away chef can't deal with 'Eat out to help out', so how are they going to deal with 10,000 orders per second when your take-away goes viral all of a sudden.

> Gatsby sites don't require complex scaling operations or expensive hosting. They scale when needed, but when traffic drops so does your usage — and your costs. Host at scale for pennies.

Netlify, or AWS and the like use machine learning to scale your server/serverless demands as and when needed. So your site can scale automatically, and only costs money when you start making money.

---

The main pinch point at the moment is build times, with large sites taking up to 20 minutes for a fresh build. Incremental builds are now an option, but I have experienced problems with them and halve to occasionally clear the cache and start a fresh due to some (at this time unknown) errors.

In summary, I see myself building with Gatsby (or something very similar) for a long time to come. The speed at which the popularity of the platform is growing has already seen integrations with loads of 3rd party service providers pop-up and are super easy to plug in and get going. It looks like it will be around for a while.
