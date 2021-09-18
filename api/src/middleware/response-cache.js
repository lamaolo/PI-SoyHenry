const cache = require("memory-cache");

const cacheFunction = (time) => {
  return (req, res, next) => {
    const key = "__express__" + req.originalUrl || req.url;

    const cachedBody = cache.get(key);

    if (cachedBody) {
      return res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, time * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cacheFunction;
