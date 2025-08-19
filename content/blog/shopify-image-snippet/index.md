---
date: "2020-04-25"
title: "Implementing Responsive Images In Shopify"
description: "Using responsive image source sets shouldn't be a hassle. In fact with this snippet, you'll never have to think about it again. With lazy loading and lazy sizes you can deliver near perfect sized images on any screen."
category: "Shopify"
cover: "./framed.jpg"
coverAlt: "Empty picture frame - Sizing images"
tags:
  - "Shopify"
  - "e-commerce"
  - "image handling"
---

##### Thumbnail or hero image, this snippet (Along side [LazySizes](https://github.com/aFarkas/lazysizes)) works anywhere!

If you're using [Liquid](https://shopify.github.io/liquid/) for your Shopify theme you will be familiar with a standard image tag.

```liquid
{% for image in product.images %}
    <img src="{{ image | img_url: 'grande' }}" alt="{{ image.alt }}">
{% endfor %}
```

Something like that. Shopify gives you plenty of options for what size you are requesting, but that's the basic concept. To save time, we don't want to be figuring out what size of image we should be requesting every time an image is included, and who knows what size of screen the end user is on. So this is actually not good enough.

Thing is, Liquid is quite a nifty templating language, and what you can do is provide a 'snippet' to act as a function that you can pass arguments to.

#### Voil&aacute;!

```liquid
{% if widthBreakPoints %}{%- assign widthBreak = widthBreakPoints | split: ',' -%}{% else %}{%- assign widthBreak = '180,360,540,720,900,1080,1296,1512,1728,1944,2160,2376,2808,3024' | split: ',' -%}{% endif %}
<img
  class="{{ classes }} lazyload"
  {% if isAsset %}
    {% if firstLoadWidth %}src="{{ imageSrc | asset_img_url: firstLoadWidth }}"
    {% else %}src="{{ imageSrc | asset_img_url: '100x' }}"{% endif %}
    data-srcset=
    "{% for width in widthBreak %}
      {% capture srcUrl %}{{ imageSrc | asset_img_url: '1x1' }} {{ width }}w{% endcapture %}
      {% assign requestedSize = width | append: 'x' %}{{  srcUrl | replace: '1x1', requestedSize }}
      {% if forloop.last != true %},{% endif %}
    {% endfor %}"
    alt="{{ altTag }}"
  {% else %}
    {% if firstLoadWidth %}src="{{ imageSrc | img_url: firstLoadWidth }}"
    {% else %}src="{{ imageSrc | img_url: '100x' }}"{% endif %}
    data-srcset=
    "{% for width in widthBreak %}
      {% capture srcUrl %}{{ imageSrc | img_url: '1x1' }} {{ width }}w{% endcapture %}
      {% assign requestedSize = width | append: 'x' %}{{  srcUrl | replace: '1x1', requestedSize }}
      {% if forloop.last != true %},{% endif %}
    {% endfor %}"
    alt="{% if imageSrc.alt != blank %}{{ imageSrc.alt }}{% else %}{{ altTag }}{% endif %}"
  {% endif %}
  data-sizes="auto"
  {{ imageAttributes }}>
{% if isAsset %}
  <noscript>
    <img class="{{ classes }} lazyloaded" src="{{ imageSrc | asset_img_url: '1440x' }}" alt="{{ altTag }}">
  </noscript>
  {% else %}
  <noscript>
    <img class="{{ classes }} lazyloaded" src="{{ imageSrc | img_url: '1440x' }}" alt="{% if imageSrc.alt  != blank %}{{ imageSrc.alt }}{% else %}{{ altTag }}{% endif %}">
  </noscript>
{% endif %}
```

Here's how to use it. Wherever you would use an `<img>` tag use this snippet instead.

```liquid
{% render 'image' with imageSrc: product.image %}
```

**Caveats:**

1. You need [LazySizes](https://github.com/aFarkas/lazysizes) included and working on your site. For help in doing this, just follow the set-up in GitHub readMe.
2. You need to have in your css a rule that sets all image to be 100% width of their containers. This helps lazy loading so the initial low-res image is stretched to the correct size and we don't get any page jump.

```css
img {
  width: 100%;
}
```

3. You copy the code above and save it in your _snippets_ folder and name it _image.liquid_.
4. Know where the image you want to include is stored. If you put the image in the file directory of your code, it's an **asset**, if you uploaded it to Shopify via the dashboard, then it's **not an asset**.

#### Parameters

All parameters passed to the snippet are optional with the exception of 'imageSrc'.

**CSS classes**
`classes: 'this-class that-class'`
This snippet is for lazy loading images so every image will have a given class of 'lazyload' already. Here is where you pass any additional classes.

**Alt tags**
`altTag: 'This Is An Alt Tag'`
If the image is not an asset image and the alt tag is set through shopifys customise UI then this will override any altTag property passed to it.

**Asset Images**
`isAsset: true`
If the image is not stored in the assets folder then just omit this parameter.

**Additional Image Attributes**
`imageAttributes: 'itemprop="image"'`
Pass any additional HTML attributes onto the image link this. Useful for metadata, dataset attributes or tab indexes.

**Width of image beakpoints**
`widthBreakPoints: '100,200,300,440,576,768,992,1200,1440,1984,2400,2880,3600,4000,5000'`
or
`widthBreakPoints: '320,576,992,1200'`
Default values can be seen in the large snippet above.
Setting these allows you to set the virtual image with break points. 'Virtual' because if a screen is retina it will request an image twice as big as it has twice as many pixels to fill.

**firstLoadWidth**
`firstLoadWidth: '800x'`
If the image is in the top fold, you may want the first load of the image to be a sharper one to limit the blur effect that happens while the browser lazy loads the correct sized image. Amount must be appended with an 'x'. This sets the width of the image requested from shopify's CDN.

#### Art direction using Bootstrap

Here you can see we have three different images that will show on different size screens. The display properties of these images are handled by CSS media query breakpoints assigned using the Bootstrap framework. Because the images are lazy loaded, and two of the three will have a 'display' value of 'none', only one full sized image will be loaded by the browser. However the other two will still load the placeholder size, which by default is 100px wide. If you would like to further mitigate this you could set the 'firstLoadWidth' to something smaller like 10px.

```liquid
{% render 'image' with imageSrc: 'balloons-mobile.jpg', classes: 'd-md-none', firstLoadWidth: '10x', isAsset: true %}
{% render 'image' with imageSrc: 'balloons-tablet.jpg', classes: 'd-none d-md-block d-lg-none', firstLoadWidth: '10x', isAsset: true %}
{% render 'image' with imageSrc: 'balloons-desktop.jpg', classes: 'd-none d-lg-block', firstLoadWidth: '10x', isAsset: true %}

```

#### Carousels

When using a carousel such as Owl Carousel the `<noscript>` element will count as a slide and so an empty slide will be created for each valid image. To make the snippet count as one element just put a div around the include, like this:

```liquid
 <div class="owl-carousel owl-theme">
  {% for image in product.images %}

    <div>
      {% render 'image' with imageSrc: image, altTag: product.title, classes: 'item' %}
    </div>

  {% endfor %}
</div>
```
