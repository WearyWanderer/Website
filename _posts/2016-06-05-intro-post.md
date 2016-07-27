---
layout: post
title:  "Introductions or: How I learned to stop worrying and love the 'Hello World'"
date:   2016-05-06 21:16:15 +0000
categories: helloworld machine learning intro blog
feature: /assets/img/intro-post/octojekyll.png
---
I've written intro's to digital projects so many times that I've lost count. Review sites, youtube projects, pre-development talent scouting, show introductions. This one is special though.

They're all quite different but the format tends to be the same - "*Hello, welcome to [X], where we will do [Y]. Some lorem ipsum dolor about the various things you should expect to see, and close with a leading text into the first piece of content.*"

How many times have you seen this kind of post? If you're the kind of person who searches for broad terms like 'programming tutorials' or 'gamedev blog', the answer is **too many times**. I feel that when writing these posts.
But this one is kind of a special one, because I'm not writing to keep anyone particular interested. I'm not writing to repel anyone either, but this is as much a site for my own records as it is one for people to come check out what I'm up to.

In a overview, it'll be a site with an 'index of digital me' as well as ramblings about programming, DIY Raspberry Pi projects & ideas, thoughts on software/games, and possibly the occasional tutorial on anything I think hasn't already got hundreds of much more helpful youtube guides waiting to be viewed. I'll also be using this site to keep track of my Final Year Project while I finish up my university degree. The project is in a field that's full of unecessarily wordy phrase-mines and a really deep rabbit hole, but for anyone who's interest is peaked I'll be using deep machine learning to create more logically rationalised environments in a variety of settings, proven out using a games implementation but with a real world potential use in city planning.

The important thing that's got me embracing this intro post is that it's the start of a place for me to write everything and anything that I want to make note of, but most importantly I think I've found a very handy tool to help me orchestrate it -

![Jekyll]({{ site.url }}/assets/img/intro-post/jekylllogo.png " ")

Jekyll is the lightweight cousin to heavy CMS's like WordPress that until recently I didn't know existed. I actually stumbled across it while looking for some cheap portfolio page hosting solutions, leading me on to GitHub Pages which is a strong supporter of Jekyll. Jekyl is a blog-aware, static site generator that is lightweight but provides most of the basic structure and setup for a simple CMS site that doesn't want to baggage of all the additional goodies offered in a solution like WP (all the buzzwords!) 
It's got a really simple file structure for adding new pages and projects, with some handy built in features that work well for the aspiring software developer, like built in code snippets:
{% highlight c++ %}
using namespace std;
int superCoolFunction()
{
    cout << "What an awesome func this is!" << endl;
    return 0;
}
{% endhighlight %}

and a slew of other features that make adding rich new pages a breeze, while removing the database and dashboard dev ops element of running your site. Better yet, the pages can be written in plain-text in whatever text editor you have at your disposal. I'm in half a mind to have a portable Pi Zero purely for writing pages on-the-go and dropping them straight up onto the site (driven from a GitHub repo if I go with the GitHub Pages solution, how shwifty is that?!), so that I can write posts wherever and whenever the thoughts come to me!

I'm going to be looking into sprucing up the site a little more, as I'd love to put some Angular.JS & D3 skills to use having finished a crash course in this, specifically for data visualisation. For now in terms of layout though, I'm really happy with the excellent [Moon Theme][moon-theme-link] provided by Taylan Tatli, it's a neat base and really hit's the sweet spot for minimal design with easy navigation


[moon-theme-link]: https://github.com/TaylanTatli/Moon
