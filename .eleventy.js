module.exports = function(config) {

    config.addPassthroughCopy('src/styles.css');
    config.addPassthroughCopy('src/js/script.js');
    return {
        passthroughFileCopy: true,
        dir: {
          input: "src",
          output: "app"        }
    }

}