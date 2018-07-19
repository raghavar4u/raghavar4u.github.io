<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <title>Minimal by Steve Smith</title>

    <link rel="stylesheet" href="stylesheets/styles.css">
    <link rel="stylesheet" href="stylesheets/pygment_trac.css">
    <meta name="viewport" content="width=device-width">
    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="wrapper">
      <header>
        <h1>Minimal</h1>
        <p>A Theme for GitHub Pages</p>
        <p class="view"><a href="http://github.com/orderedlist/minimal">View the Project on GitHub <small>orderedlist/minimal</small></a></p>
        <ul>
          <li><a href="https://github.com/orderedlist/minimal/zipball/master">Download <strong>ZIP File</strong></a></li>
          <li><a href="https://github.com/orderedlist/minimal/tarball/master">Download <strong>TAR Ball</strong></a></li>
          <li><a href="http://github.com/orderedlist/minimal">Fork On <strong>GitHub</strong></a></li>
        </ul>
      </header>
      <section>
        <h1>GitHub Flavored Markdown</h1>

        <p><em>View the <a href="http://github.github.com/github-flavored-markdown/sample_content.html">source of this content</a>.</em></p>

        <p>Let's get the whole "linebreak" thing out of the way. The next paragraph contains two phrases separated by a single newline character:</p>

        <p>Roses are red<br>
        Violets are blue</p>

        <p>The next paragraph has the same phrases, but now they are separated by two spaces and a newline character:</p>

        <p>Roses are red<br><br>
        Violets are blue</p>

        <p>Oh, and one thing I cannot stand is the mangling of words with multiple underscores in them like perform_complicated_task or do_this_and_do_that_and_another_thing.</p>

        <h2>A bit of the GitHub spice</h2>

        <p>In addition to the changes in the previous section, certain references are auto-linked:</p>

        <ul>
          <li>SHA: be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2</li>
          <li>User@SHA ref: <a href="https://github.com/mojombo/product/commit/be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2" class="commit-link">mojombo@<tt>be6a8cc</tt></a></li>
          <li>User/Project@SHA: <a href="https://github.com/mojombo/god/commit/be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2" class="commit-link">mojombo/god@<tt>be6a8cc</tt></a></li>
          <li>#Num: <a href="https://github.com/github/product/issues/1" class="issue-link" title="Baseline: What is up in the air right now?">#1</a></li>
          <li>User/#Num: mojombo#1</li>
          <li>User/Project#Num: <a href="https://github.com/mojombo/god/issues/1" class="issue-link" title="The server is not available (or you do not have permissions to access it)">mojombo/god#1</a></li>
        </ul>

        <p>These are dangerous goodies though, and we need to make sure email addresses don't get mangled:</p>

        <p>My email addy is <a href="mailto:tom@github.com">tom@github.com</a>.</p>

        <h2>Math is hard, let's go shopping</h2>

        <p>In first grade I learned that 5 &gt; 3 and 2 &lt; 7. Maybe some arrows. 1 -&gt; 2 -&gt; 3. 9 &lt;- 8 &lt;- 7.</p>

        <p>Triangles man! a^2 + b^2 = c^2</p>

        <h2>We all like making lists</h2>

        <p>The above header should be an H2 tag. Now, for a list of fruits:</p>

        <ul>
          <li>Red Apples</li>
          <li>Purple Grapes</li>
          <li>Green Kiwifruits</li>
        </ul>

        <p>Let's get crazy:</p>

        <ol>
          <li>
            <p>This is a list item with two paragraphs. Lorem ipsum dolor<br>
            sit amet, consectetuer adipiscing elit. Aliquam hendrerit<br>
            mi posuere lectus.</p>

            <p>Vestibulum enim wisi, viverra nec, fringilla in, laoreet<br>
            vitae, risus. Donec sit amet nisl. Aliquam semper ipsum<br>
            sit amet velit.</p>
          </li>
          <li><p>Suspendisse id sem consectetuer libero luctus adipiscing.</p></li>
        </ol>

        <p>What about some code <strong>in</strong> a list? That's insane, right?</p>

        <ol>
          <li>
            <p>In Ruby you can map like this:</p>

            <pre><code>['a', 'b'].map { |x| x.uppercase }</code></pre>
          </li>
          <li>
            <p>In Rails, you can do a shortcut:</p>

            <pre><code>['a', 'b'].map(&amp;:uppercase)</code></pre>
          </li>
        </ol>

        <p>Some people seem to like definition lists</p>

        <dl>
          <dt>Lower cost</dt>
          <dd>The new version of this product costs significantly less than the previous one!</dd>
          <dt>Easier to use</dt>
          <dd>We've changed the product so that it's much easier to use!</dd>
        </dl>

        <h2>I am a robot</h2>

        <p>Maybe you want to print <code>robot</code> to the console 1000 times. Why not?</p>

        <pre><code>def robot_invasion
  puts("robot " * 1000)
end
  </body>
</html>
