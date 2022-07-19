const util = require('util');
const exec = util.promisify(require('child_process').exec);


const getAll = async (_req, res) => {

  res.status(200).json({
		status: 200,
		data: "data"
	})

}

const webhook = async (_req, res) => {
  console.log('sudo bash update.sh')
  const { stdout, stderr } = await exec('bash update.sh');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  res.status(200).json({
    status: 200,
  })
}

const info = async (req, res) => {

  let lang = req.headers["accept-language"];
  if (lang) {
    lang = lang.split(',')[0]
  } else {
    lang = "fr-FR"
  }
  res.status(200).json({
    status: 200,
    data: {
      lang: lang,
    }
  })

}


module.exports = {
  getAll,
  webhook,
  info
}
