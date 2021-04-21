# SigFig take home test instructions

## Pre reqs
Install brew, node, npm & mongo. On OSX the commands below should work.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor #fix all issues
brew update
brew install node
brew tap mongodb/brew
brew install mongodb-community
```

Setup MongoDb data directory
```
mkdir -p data/db
```

## Download dependencies
From your project folder run the following
```
npm install

#Mac users use run start
npm run start

#Windows users run these two commands
npm run mongo
npm run server
```
* Navigate to http://localhost:3001/testCode/index.html
* Do you work within the testCode directory

## Submit your work
Submit your testCode directory, and anything else you've built as a zip file back to your recruiter. If running your solution will require the grader to do anything beyond dropping your testCode directory into a running node server, let us know.


## Questions/troubleshooting setup issues
Ping your recruiter and they'll help you get it working


{
  "name": "Sigfig_FE_RPT",
  "description": "Sigfig Front end programming test",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "express": "3.x",
    "mongodb": "^3.6.4",
    "node": "^15.7.0",
    "swagger-jsdoc": "^1.3.0"
  },
  "devDependencies": {
    "mongoose": "^4.8.4"
  },
  "scripts": {
    "mongo": "mongod --dbpath data/db",
    "server": "cd server && node server.js",
    "start": "npm run mongo & sleep 3 & npm run server"
  }
}

