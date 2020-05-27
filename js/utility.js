/**
 * Given a key/value list of fileKey/filePaths, fetch all assets and do a
 * callback back to the passed callback with the loaded data.
 *
 * @param fileList
 * @param callback
 */
function loadFileList(fileList, callback) {
  var data = {};

  for (let [key, url] of Object.entries(fileList)) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((fetchData) => {
        data[key] = fetchData;
      });
  }

  let preload = null;
  $(function () {
    preload = setInterval(function () {
      console.log('preload running....');
      if (Object.keys(fileList).length === Object.keys(data).length) {
        clearInterval(preload);
        callback(data);
      }
    }, 100);
  });
}

/**
 * For a given template, populate the template then return the HTML to be
 * inserted.
 *
 * @returns {*}
 */
function applyTemplate(template, data) {
  return templates[template](data);
}

/**
 * Shows an error to the user.
 *
 * @param errorMessage
 */
function showError(errorMessage) {
  $('.feedback').empty().append(applyTemplate('ErrorMessage', {errorMessage: errorMessage}));
}
