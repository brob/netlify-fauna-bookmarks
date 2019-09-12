const sheets = require('google-spreadsheet');
const creds = require('./credentials.json');
creds['private_key_id'] = process.env.private_key_id;
var doc = new sheets('1OObbPDfBJoVinO7KLMvhQtrpPT1OQuI5lNw0_Pa94DA');

function getDetails() {
    const data = new Promise((resolve, reject) => {
        doc.useServiceAccountAuth(creds,  function (err) {
            console.log(err);
            doc.getRows(1, function (err, info) {
                resolve(JSON.stringify(info));
            });
          });
    });
    console.log(data);
    return data;  

}

exports.handler = async function(event, context) {
    try {
      const body = await getDetails();
      console.log('handler');
      return { statusCode: 200, body };
    } catch (err) {
      return { statusCode: 500, body: err.toString() };
    }
  };
  