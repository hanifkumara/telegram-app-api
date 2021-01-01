const { response } = require('../helpers/response')
const createError = require('http-errors')
const { modelAllUsers, modelListUsers, modelUpdateProfile, modelIdUser, modelMyProfile} = require('../models/users')
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
exports.getIdUser = (req, res, next) => {
  const {id} = req.params
  modelIdUser(id)
    .then((result) => {
      return response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.getMyProfile = (req, res, next) => {
  const {myId} = req
  modelMyProfile(myId)
    .then(result => {
      return response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.internalServerError()
      return next(error)
    })
}
exports.updateProfile = (req, res, next) => {
  const {myId} = req
  const {username, phoneNumber, biodata, password, socketId} = req.body
  const data = {}
  if (req.file) {
    data.photo = `${process.env.BASE_URL}/upload/${req.file.filename}`;
  }
	if (username) {
		data.username = `@${req.body.username}`;
	}
	if (phoneNumber) {
		data.phoneNumber = req.body.phoneNumber;
	}
	if (biodata) {
		data.biodata = req.body.biodata;
  }
  if (socketId) {
    data.socketId = req.body.socketId
  }
	if (!password) {
    delete data.password;
		modelUpdateProfile(myId, data)
			.then((result) => {
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