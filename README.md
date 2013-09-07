milehigh
========

This is a game about trying to get lucky on a plane, but while that's happening, there are many things trying to prevent that from taking place and making you unlucky. An http://js13kgames.com contest entry.

## How to setup project

        cd root-of-project
        npm install -g grunt-cli    # if you don't have grunt installed
        npm install                 # to install all build-process dependencies
        grunt                       # runs tests, creates a 'dist' folder with final minified files

For more info: This project originally created via Yeoman and the webapp generator. More info: [generator-webapp](https://github.com/yeoman/generator-webapp)

## Where's the code?

All the source files are under ./app

## How to build and preview the site

        grunt server        # previews site via a node server

or
        grunt
        cd dist
        # open up index.html file in your browser

## If you want to add/run tests

        grunt test

## To build for distribution

		grunt build 		# which builds the "dist" folder
		zip -r -9 dist.zip dist