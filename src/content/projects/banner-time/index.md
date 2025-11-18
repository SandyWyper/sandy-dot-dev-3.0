---
# posttype: "projects"
date: "2020-02-01"
title: "Banner Time"
order: 3
description: "I created a JQuery plugin that injects sale or announcement banners for a scheduled time. Simply include the JavaScript file below your JQuery script tag, and the 'Banner' object will be available to initiate."
category: "Side Project"
cover: "./banner-time.jpg"
coverAlt: "Stop sign! Banner time!"
tags:
  - "JavaScript"
  - "WebPack"
  - "JQuery"
  - "Open Source"
repository: "https://github.com/SandyWyper/Banner-Time"
live: "https://codepen.io/SandyWyper/pen/yLLGzOx?editors=0010"
---

> A JQuery plug-in that injects a sale or announcement banner for a scheduled start and finish time.

### Objective

Lets say you have an e-commerce site, or for example a football team's website. There's a sale or game coming up and you want a banner across the top of the page to say, "Two days to go!!" or "Click here to buy tickets for tomorrow's game". However, you don't want to be editing the website everyday to update this banner. You need to be able to set it up once, so that banner changes everyday, and doesn't appear after the sale/match has finished. Requirements:

1. Need to be able to set up multiple instances. Different messages for different days.
2. You will want different messages for mobile and desktop screen sizes.
3. We want to style the banner to suit the style of the website.
4. We need to be able to declare a start and finish time for each instance.
5. The code must be self contained and not affect the rest of the site.

![banner-time-demo](/banner-time-demo.gif)

### Set the foundations

In the world of front-end development, most websites (huge sweeping generalisation) include JQuery. This code requires it as a dependency, so all you have to do is make sure this plug-in is loaded after JQuery.

I took the structure for this project from a [lesson&nbsp;by&nbsp;Ken&nbsp;Wheeler](https://scotch.io/tutorials/building-your-own-javascript-modal-plugin), that sets about writing your own pop-up modal plug-in. Ken Wheeler also wrote [Slick&nbsp;Slider](https://kenwheeler.github.io/slick/) which is a widely used image carousel plugin, so I based the repository structure on that. I build this to be open-source, so others could contribute and improve the plugin (at the time of writing this..... no takers).

### Get going

Say you want to show some sale banners at the top of your site like [this](https://codepen.io/SandyWyper/full/yLLGzOx).

**First** include the script after JQuery

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="bannerTime.js"></script>
```

**Then** initiate your banners

```html
<script>
  const firstBanner = {
    startTme: [2019, 11, 22],
    endTime: [2019, 11, 23],
    bannerText: {
      desktop: ["3 Days Until Xmas", "Shop now"],
      mobile: ["3 Days To Go!", "Xmas time!"],
    },
  };
  const secondBanner = {
    startTime: [2019, 11, 23],
    endTime: [2019, 11, 24],
    bannerText: {
      desktop: ["2 Days Until Xmas", "Shop now"],
      mobile: ["2 Days To Go!", "Xmas time!"],
    },
  };
  const thirdBanner = {
    startTime: [2019, 11, 24],
    endTime: [2019, 11, 25],
    bannerText: {
      desktop: ["1 Day Until Xmas", "Shop now"],
      mobile: ["1 Day To Go!", "Delivery NOT guaranteed!"],
    },
  };

  const myXmasBanner = new Banner(firstBanner, secondBanner, thirdBanner);
</script>
```

That's it. The banners should appear on the correct day, fade transition between each message slide, and stop showing on Christmas day. You can further customise the slides by following the instructions in the [repo&nbsp;readme](https://github.com/SandyWyper/Banner-Time/blob/master/README.md). Change; the slide transition type, the transition speed and interval, the styles(CSS) of the banner, the time zone, and add a link to the banner element.

### Conclusion

While building this, I came to learn about how to handle time on the web. JavaScript comes pre-packed with methods that allow us to use time, like the [UTC()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) (universal coordinated time).

> The UTC() method returns the number of milliseconds between a specified date and midnight of January 1, 1970, according to universal time.

The timing functionality of _Banner-Time_ uses UTC to calculate, wherever in the world the user is, what time it is and compares it to the time that the banners are scheduled to show for. However, if I set up a banner in the UK to change at midnight in the summer time, it will in fact change at 1am. This is because UTC is set to GMT, and doesn't take into account daylight savings.

A possible solution to this would be to integrate [moment.js](https://momentjs.com/) as a dependency, however this would increase the package size to 25k from 6.5k. That's 4x the size, which I think, considering it's just a simple message banner, probably overkill. _Banner-Time_ does allow you to adjust the time zone, so as long as you keep in mind about the DLS issue it can still be a useful tool.
