const { response } = require('../helpers/response')
const createError = require('http-errors')
const { modelAllUsers, modelListUsers, modelUpdateProfile} = require('../models/users')
require('dotenv').config();
const bcrypt = require('bcryptjs');

exports.getAllUsers = (req, res, next) => {
  modelAllUsers()
    .then((result) => {
      return response(res, 200, result, null)
    }).catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    });
}

exports.listUsers = (req, res, next) => {
  const {myId} = req
  const {name} = req.query
  modelListUsers(myId, name)
    .then((result) => {
      return response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.updateProfile = (req, res, next) => {
  const {myId} = req
  const {name, phone, biodata, password} = req.body
  const data = {}
  if (req.file) {
    data.photo = `${process.env.BASE_URL}/upload/${req.file.filename}`;
  }
	if (name) {
		data.name = req.body.name;
	}
	if (phone) {
		data.phone = req.body.phone;
	}
	if (biodata) {
		data.biodata = req.body.biodata;
	}
	if (!password) {
    delete data.password;
    console.log(data)
		modelUpdateProfile(myId, data)
			.then((result) => {
        console.log(result)
				delete data.password;
				response(res, 200, {data, message: 'Update success'}, null);
			})
			.catch(() => {
				const error = createError.InternalServerError();
				return next(error);
			});
  } else if (password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        data.password = hash;
        modelUpdateProfile(myId, data)
          .then((result) => {
            console.log(result)
            delete data.password;
            response(res, 200, { data, message: 'Update success' }, null);
          })
          .catch(() => {
            const error = createError.InternalServerError();
            return next(error);
          });
      });
    });
  }
  
}