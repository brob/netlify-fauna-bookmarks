module.exports = function(config) {

    config.addPassthroughCopy('src/styles.css');
    return {
        passthroughFileCopy: true,
        dir: {
          input: "src",
          output: "app"        }
    }

}