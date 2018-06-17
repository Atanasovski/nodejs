# Building a Simple App with Algolia API, Node, Express, Pug, Bootstrap & MongoDB

## App Description

The app is connecting once per hour to Angolia API which shows recently posted articles about Node.js on Hacker News:

```
https://hn.algolia.com/api/v1/search_by_date?query=nodejs
```

## Requirements

* [Node.js](http://nodejs.org/)
* [Express](https://expressjs.com/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [Bootstrap](https://getbootstrap.com/)
* [MongoDB](https://www.mongodb.com/)


## Installation Steps

1. Clone repo
2. Run `npm install`
3. Start MongoDB (using `mongod`) if running locally
4. Run `node mongodb/create_mongo_db.js`
5. Run `node mongodb/mongodb_createcollection.js`
6. Run `node mongodb/mongodb_insert.js` for initial insert
7. Set cron job to run once per hour `0 */1 * * * /bin/node /nodejs/mongodb/mongodb_insert.js`
8. Run `npm run watch`
9. Visit http://localhost:3000 


## License

This project is licensed under the MIT License
