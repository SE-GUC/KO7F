const joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PortalLibrary = require("../../models/PortalLibrary");

//= =---------------------------------------------------= =//
//= =--- HANDLE //= =---------------------------------------------------= =//
//= =--- HANDLE portalLibraries lists
//= =---------------------------------------------------= =//
router
  .route("/")
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      title: joi
        .string()
        .min(3)
        .max(50)
        .required(),
      details: joi
        .string()
        .min(3)
        .required()
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    try {
      const portalLibrary = await new PortalLibrary({
        _id: mongoose.Types.ObjectId(),
        title: request.body.title,
        details: request.body.details
      }).save();
      return response.json({ data: portalLibrary });
    } catch (err) {
      return response.json({
        error: `Error, couldn't create a new portalLibrary with the following data`
      });
    }
  })
  .get(async (request, response) => {
    try {
      const allportalLibraries = await PortalLibrary.find({}).exec();
      return response.json({ data: allportalLibraries });
    } catch (err) {
      return response.json({
        error: `Error, Couldn't fetch the list of all portalLibraries from the database`
      });
    }
  });
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE portalLibrary detail
//= =---------------------------------------------------= =//
router
  .route("/:id")
  .all(async (request, response, next) => {
    const status = joi.validate(request.params, {
      id: joi
        .string()
        .length(24)
        .required()
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    next();
  })
  .get(async (request, response) => {
    try {
      const portalLibrary = await PortalLibrary.findById(
        request.params.id
      ).exec();
      return response.json({ data: portalLibrary });
    } catch (err) {
      return response.json({
        error: `Error, couldn't find a PortalLibrary given the following id`
      });
    }
  })
  .put((request, response) => {
    PortalLibrary.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (err, model) => {
        if (!err) {
          return response.json({ data: model });
        } else {
          return response.json({
            error: `Error, couldn't update a PortalLibrary given the following data`
          });
        }
      }
    );
  })
  .delete((request, response) => {
    PortalLibrary.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null });
      } else {
        return response.json({
          error: `Error, couldn't delete a PortalLibrary given the following data`
        });
      }
    });
  });

module.exports = router;
