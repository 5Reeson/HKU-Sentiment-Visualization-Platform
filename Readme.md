# Readme
## How to run the project
- Make sure you have Node.js in your environment
- run `npm install` to install the dependencies
- run `npm run dev` to run the project in your local server by Vite
## Project Structure
All the pages about the project is under the /src files.
- assets: the static assets like pictures
- components: key React components that consists the project
  - Header: header of the page
  - NoticeBoard: the noticeboard component to show the news of the project
  - Overview: the overview dashboard
  - PostList: the component to show the top-20 posts in Weibo and Twitter
  - Twitter Page: the Twitter dashboard page
  - Weibo Page: the Weibo dashboard page
  - wordcloud: the world cloud component
- App.jsx: the main page of the platform
- main.jsx: the entrance page of the whole project

And in the root path, the `package.json` is the config files about the node modules, and the `vite.config.js` is the engineering config files about Vite.js.