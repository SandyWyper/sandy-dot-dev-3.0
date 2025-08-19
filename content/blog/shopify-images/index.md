---
date: "2020-04-20"
title: "How to handle images in Shopify"
description: "Have you spent hours and hours processing images to reduce file size in order to speed up your Shopify site?  Well don't."
category: "Shopify"
cover: "./shopify.jpg"
coverAlt: "Shopify logo"
tags:
  - "Shopify"
  - "e-commerce"
  - "images"
---

##### Have you spent hours and hours processing images to reduce file size in order to speed up your Shopify site? Well, you shouldn't!

It makes sense right? You want to limit the file size that you upload to Shopify, and that way your users wont use up all their data browsing your product catalogue. If only it were that simple.

Shopify are massive. You don't have to be working in silicone valley to know that they are dominating e-commerce worldwide. So when you sign up to use them, you can trust that the services they provide, like image hosting, are going to be top notch.

When you upload an image to Shopify they recommend sizing them accordingly....

> Your product and collection images can be any size up to 4472 x 4472 px, or 20 megapixels. Product and collection images need to have a file size smaller than 20 MB to be added to Shopify.

The smaller pixel width size for product images is recommended because you will be able get as close to that 20MB limit as possible while keeping the quality really high. If you have an image of 4472px wide, you may need to reduce the quality slightly while keeping it that large to get under the 20MB limit. The reason for this will become clear later...

#### You don't need Photoshop

If all you're using Photoshop for is to crop and save files for the web then you might be wasting your money. You can crop an image in Preview on Mac, or Microsoft Paint on Windows. Easy. So you need to resize the image to upload? Shopify's got your back. [Try&nbsp;out&nbsp;this&nbsp;useful tool](https://www.shopify.co.uk/tools/image-resizer) for resizing your images.

You see all the clever compression without losing quality that Photoshop offers is wasted on Shopify. When you upload an image, whether directly you your code's assets, or uploaded through the Shopify dashboard, a copy of the image is made and re-rendered. I have done tests where I have exported the same image from Photoshop and the same dimensions but a fraction of the file size. When uploaded to Shopify and requested again through a website at the same size, the file sizes of the two images were practically identical.

The moral of the story is. Give Shopify the best image you can, regardless of file size. The clever bit happens later.

#### [No&nbsp;Big&nbsp;Sizes](https://www.youtube.com/watch?v=zA4jOgMYaS0)

Shopify's CDN (Content Delivery Network) is top notch, but to understand how it works is key to using it properly.

A user types in the URL of your site. Shopify (or whoever it's host by) delivers an html document. In that document are URLs to the other files the browser needs to render that page. It's better to split it up this way for more reasons than you can wave a stick at. Your images all use this tactic, and individual requests are sent to Shopify's CDN for all the images on the page. Each image has it's own url, and you can tack an extra bit of the end to request what ever dimension of image you require. Shopify quickly (i mean really quickly) creates an image of the desired size and sends it to you. Shopify will then cache (save) that image for a while in case another user wants one of the same size. Genius!

There's just one more thing... You can't request an image larger than the one you uploaded, only smaller. So how earlier I said that resizing your images to 2000px for product images. This is because product image are traditionally at most half the screen size on desktop view. If you have an image on your home page that wants to be super sharp and it fills the whole screen, then you should upload the 4000px version. If a browser is 1800px wide on 2x pixel density retina screen, then you're going to want a really large image. You could stretch a 2000px image, but you'll get better results from the correct sized image in order to fill those pixels on your screen.

> So general rule of thumb. If it spans a whole desktop screen, go 4k pixels, else 2k pixels. And don't reduce the quality!

#### Shipping the correct image

Most themes or developers worth their salt will handle this bit. The short explanation is that you provide the users browsers an array of addresses for different sized images, and the users browser will chose the best one to display on that screen.

Something like this...

```html
<img
  src="//cdn.shopify.com/s/files/1/1123/2341/products/some-image_100x.jpg?v=123456"
  srcset="
    //cdn.shopify.com/s/files/1/1123/2341/products/some-image_100x.jpg?v=123456   100w,
    //cdn.shopify.com/s/files/1/1123/2341/products/some-image_300x.jpg?v=123456   300w,
    //cdn.shopify.com/s/files/1/1123/2341/products/some-image_600x.jpg?v=123456   600w,
    //cdn.shopify.com/s/files/1/1123/2341/products/some-image_1200x.jpg?v=123456 1200w,
    //cdn.shopify.com/s/files/1/1123/2341/products/some-image_2000x.jpg?v=123456 2000w
  "
  sizes="100vw"
  alt="Alt text"
/>
```

If you want to know how to implement this from a developers point of view you can read my [other&nbsp;post](https://sandywyper.dev/blog/shopify-image-snippet/) on the subject here.
