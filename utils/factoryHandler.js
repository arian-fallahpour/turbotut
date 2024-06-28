import { NextResponse } from "next/server";
import catchAsync from "./catchAsync";
import { connectDB } from "./database";
import AppError from "./AppError";
import APIQuery from "./APIQuery";
import { toCap } from "./helper";

import collections from "@/app/data/dashboard/collections";

const getName = (Model, plural = false) => {
  if (plural) {
    return Model.collection.collectionName;
  }

  return Model.collection.collectionName.substring(0, Model.collection.collectionName.length - 1);
};

export const getAll = (Model) =>
  catchAsync(async function (req) {
    // Connect to database
    await connectDB();

    // Find documents

    const apiQuery = new APIQuery(Model.find(), req.data.query).filter().sort().search().select().paginate();

    const totalCount = await apiQuery.getTotalCount();
    const documents = await apiQuery.execute();
    const name = getName(Model, true);

    // Send response
    return NextResponse.json(
      {
        status: "success",
        data: {
          results: documents.length,
          totalResults: totalCount,
          [name]: documents,
        },
      },
      { status: 200 }
    );
  });

export const getOne = (Model) =>
  catchAsync(async function (req, { params }) {
    // Check if id is provided
    const name = getName(Model);
    if (!params.id) return new AppError(`Please provide the id of a ${name} to get`, 400);

    // Connect to database
    await connectDB();

    // Find document
    const document = await Model.findById(params.id);

    // Throw error if no document found
    if (!document) return new AppError(`No ${name} found`, 404);

    // Send response
    return NextResponse.json(
      {
        status: "success",
        data: {
          [name]: document,
        },
      },
      { status: 200 }
    );
  });

export const createOne = (Model) =>
  catchAsync(async function (req, {}) {
    // Check if body exists
    if (!req.data.body) return new AppError("Please provide JSON data in the body", 400);

    // Connect to database
    await connectDB();

    // Create new document
    const documentNew = await Model.create(req.data.body);
    const name = getName(Model);

    // Send response
    return NextResponse.json(
      {
        status: "success",
        data: {
          [name]: documentNew,
        },
      },
      { status: 201 }
    );
  });

export const updateOne = (Model) =>
  catchAsync(async function (req, { params }) {
    // Check if body exists
    if (!req.data.body) return new AppError("Please provide JSON data in the body", 400);

    // Check if id is provided
    const name = getName(Model);
    if (!params.id) return new AppError(`Please provide the id of a ${name} to delete`, 400);

    // Connect to database
    await connectDB();

    // Find and update document
    const documentUpdated = await Model.findByIdAndUpdate(params.id, req.data.body, { runValidators: true, new: true });

    // Send response
    return NextResponse.json(
      {
        status: "success",
        data: {
          [name]: documentUpdated,
        },
      },
      { status: 200 }
    );
  });

export const deleteOne = (Model) =>
  catchAsync(async function (req, { params }) {
    // Check if id is provided
    const name = getName(Model);
    if (!params.id) return new AppError(`Please provide the id of a ${name} to delete`, 400);

    // Connect to database
    await connectDB();

    // Check if document exists
    const document = await Model.findById(params.id);
    if (!document) return new AppError(`Could not find ${name} to delete`, 400);

    // Delete document
    await document.deleteOne();

    // Don't return anything, since status code is 204 (no-content)
    return new Response(null, { status: 204 });
  });

export const archiveOne = (Model) =>
  catchAsync(async function (req, { params }) {
    // Check if id is provided
    const name = getName(Model);
    if (!params.id) return new AppError(`Please provide the id of a ${name} to delete`, 400);

    await connectDB();

    // Check if document exists
    const document = await Model.findById(params.id);
    if (!document) return new AppError(`Could not find ${name} to archive`, 400);

    // Archive document
    document.isArchived = true;
    await document.save();

    // Send response
    return NextResponse.json(
      {
        status: "sucesss",
        data: {
          [name]: document,
        },
      },
      { status: 200 }
    );
  });

export const editOneByForm = (Model, sendResponse = true) =>
  async function (req, { params }) {
    const name = getName(Model);
    if (!params.id) return new AppError(`Please provide the id of the ${name}`, 400);

    // Connect to database
    await connectDB();

    // Find document
    const document = await Model.findById(params.id);
    if (!document) return new AppError(`${toCap(name)} not found with provided id`, 404);

    // Update document
    const collectionData = collections.find((c) => c.name === getName(Model, true));
    collectionData.editableFields.forEach((field) => {
      const value = req.data.formData[field.name];
      if (field.type !== "image" && value !== undefined) {
        document[field.name] = value;
      }
    });
    await document.save();

    if (sendResponse) {
      return NextResponse.json(
        {
          status: "success",
          data: { [name]: document },
        },
        { status: 200 }
      );
    } else {
      req.data[name] = document;
    }
  };

export const createOneByForm = (Model, sendResponse = true) =>
  async function (req, { params }) {
    const name = getName(Model, true);
    const collectionData = collections.find((c) => c.name === name);

    // Filter fields by editable fields
    const filteredData = {};
    collectionData.editableFields.forEach((field) => {
      const value = req.data.formData[field.name];
      if (field.type !== "image" && value !== undefined) {
        filteredData[field.name] = value;
      }
    });

    // Connect to database
    await connectDB();

    // Create new document with all data besides image
    const document = await Model.create(filteredData);

    if (sendResponse) {
      return NextResponse.json(
        {
          status: "success",
          data: { [getName(Model)]: document },
        },
        { status: 200 }
      );
    } else {
      req.data[getName(Model)] = document;
    }
  };
