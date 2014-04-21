## slick.js
#### A powerfull serveless blog engine. Slick!

(picture and logo)



**slick.js** is a powerfull serveless blog engine. High modular and light. You can have your blog running with only 3-steps configuration and no need for server-side code whatsoever. slick!

###Awesome!! How does it work ?

Slimple and *slick*: 

**1. Include slick.js in the HTML**
 
As any javascript lib, slick has to be included in the HTML file where the posts will be fetched and displayed.
```html
<script src="js/slick.js"></script>
```

**2. Setup *slick*'s environment**

*slick* is a high modular engine. Which means, every feature is a plugin. In order configure a blog, you just have to tell to out beloved *slick* ghost which plugins he should run:

-- CHANGE code!
```javascript
Slick.setGithubConfigs("username", "repo-name");
```

Check [some examples][1] of how easy and cool it is to have slick ghost working for you!!

**3. Enjoy!!**

Aaaannd, that's it!
Now you have the *slick* ghost will take care of the rest: fetch your blog data according to the plugins, parse it and display it on the page. It will offer you quite a bunch of features, such as:

- **URL routing**: People can access your different blog posts by visiting www.yourblog.co/blog/post_title

- **Templating engine**: your blog posts should be written in HTML by default. But new upcoming plugins will allow ou to write in markdown as well! 

- **Cache system**: Ghosts are fast!! Your blog will fly! (:



###templates
*slick* fetches the blog content depending on the plugins configurated. Though, the content should follow a really simple and slick template language.

The main idea is that every marker `{{title}}`, `{{content}}` and `{{date}}` will be replaced by the blog's title, content and date respectively. So imagine the following template:

```html
<b>{{title}}</b>, written on {{date}} <br>
<p>{{content}}</p>
```

The *slick* ghost (whatta cool guy!) will automatically replace the *{{...}}* markers by the fetched content and show it in your blog!

Check some basic template examples [here][2].


###plugins
*slick* is structured to be a rather simple and modular engine. To increase features, such as different way to fetch data, comments, routing configurations, and other functionalities can be added via plugins. The list of the available plugins are in our website: [www.slick.github.io][3] -- check it out!!

###examples

picture of slick ghost saying goodbye!


  [1]: examples
  [2]: https://github.com/gpestana/slick.js/tree/master/templates
  [3]: www.slick.github.io