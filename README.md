## slick.js
- - -

####Disclaimer 31.03 -  both *slick.js* and its documentation still in a beta and under development process. Some stuff has still to be implemented and refactored. Anyways, contributions and ideas are welome!

###what

**slick.js** is a client-side blog framework powered by javascript and github. Only 3-steps to run your blog and no need for server-side code whatsoever. slick!

###Awesome!! How does it work ?

Slimple and *slick*: it fetches the content from a public github repo. After, it populates a pre-defined HTML template with the fetched data and appends it to a given *DOMhandler* -- which is pretty much a HTML id or class that exists on your page.

###Seems cool! What about the instalation ?
**1. Include slick.js in the HTML**
 
As any javascript lib, slick has to be included in the HTML file where the posts will be fetched and displayed.
```html
<script src="js/slick.js"></script>
```


**2. Configure github username and repo**

In order to fetch the blog's content, the lib must know the **username** and **repo-name**  where to fetch the data. 
Note that repo-name is the name of the github repository where the posts are stored (check below for more infi about github storage)

```javascript
Slick.setGithubConfigs("username", "repo-name");
```
**3. Fetch data**

Finally, we should ask *slick* for fetch the data from github. Also, we should tell *slick* which template should be be used to render the data.
More about templates below.

i) For fetching a all blog entries metadata:
```javascript
Slick.fetchAllEntriesMetadata(DOMhandler, HTMLtemplatePath);
```
where *DOM-handler* is the HTML ID or class where the template will the appended. 

ii) For fetching last post:
```javascript
Slick.fetchLastEntry(DOMhandle, HTMLtemplatePath);
```

iii) For fetching a particular post:
```javascript
Slick.fetchSingleEntry(postTitle,DOMhandler,templateName);
```
The *postTitle* must have the same format as its title in github and must respect this convention: *data@title*, (eg. '2013.01.01@post1_title').

And that's it! You got your blog system working. Slick!!


###templates
*slick* fetches the requested data from github, populates a HTML template with the fetched data and appends it to the provided DOMhandler.  

Templates are HTML files that resemble template languages such as [jinja][1].

The main idea is that every marker *{{title}}*, *{{content}}* and *{{date}}* will be replaced by the blog's title, content and date respectively. So imagine the following template:

```html
<b>{{title}}</b>, written on {{date}} <br>
<p>{{content}}</p>
```

*slick* will automatically replace the *{{...}}* markers by the fetched content and append the whole code to the DOMhandler provided before. 

Check some basic template examples [here][2].


###content in github
The content is stored in github as in this [repository][3]
There are only a few things to have in mind when writing content so that *slick* can fetch the data properly:

1. Each entry in the repo is a blogpost
2. The entry's content is the HTML that you want to replace in the template *{{content}}* marker.
3. The title of the entry should have the following format: **2013.01.01@post1_title**

Check the repo example [here][4]


###plugins
*slick* is structured to be a rather simple and modular framework. So, we have to use pluggins in order to have some additional features.
Some pluggins


  [1]: http://jinja.pocoo.org/
  [2]: https://github.com/gpestana/slick.js/tree/master/templates
  [3]: https://github.com/gpestana/blog-posts
  [4]: https://github.com/gpestana/blog-posts
