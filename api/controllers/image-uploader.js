module.exports = {
  friendlyName: 'Image uploader',

  description: '',

  inputs: {
  },

  exits: {
    success: {
      url: ''
    }
  },

  fn: async function (inputs, exits) {
    try {
      let uploadedFiles = await new Promise((resolve, reject) => {
        this.req.file('file').upload({
          dirname: require('path').resolve(sails.config.appPath, 'assets/uploads'),
        }, function whenDone(err, uploadedFiles) {
          if (err) {reject(err);}
          else {resolve(uploadedFiles);}
        });
      });

      if (uploadedFiles.length === 0) {
        return exits.success('No file was uploaded');
      } else {
        let fileURL = `${sails.config.custom.baseUrl}/uploads/${require('path').basename(uploadedFiles[0].fd)}`;
        return exits.success({
          url: fileURL,
        });
      }
    } catch(err) {
      return exits.error(err);
    }
  },
};
