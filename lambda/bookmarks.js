
exports.handler = async function(event, context) {
  switch (event.httpMethod) {
    case "GET":
      return require('./bookmarks/getAll').handler(event, context);
    case "POST":
      return require('./bookmarks/create').handler(event, context);
  }
};
  