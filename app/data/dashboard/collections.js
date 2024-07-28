import enumValues from "../enum-values";

import SchoolIcon from "@/components/Elements/Icons/SchoolIcon";
import LibraryIcon from "@/components/Elements/Icons/LibraryIcon";
import BookIcon from "@/components/Elements/Icons/BookIcon";
import ArticleIcon from "@/components/Elements/Icons/ArticleIcon";
import UserIcon from "@/components/Elements/Icons/UserIcon";
import CartIcon from "@/components/Elements/Icons/CartIcon";

/**
 * NOTES
 * - editable fields is ALWAYS a subset of viewable fields
 */

const data = [
  {
    name: "courses",
    icon: <SchoolIcon />,
    isSwappable: false,
    titleField: "name",
    tableFields: [
      { type: "string", label: "name", name: "name", spacing: "25rem" },
      { type: "string", label: "subject", name: "subject", spacing: "minmax(15rem, 1fr)" },
      { type: "string", label: "chapters", name: "chaptersCount", spacing: "12.5rem" },
      { type: "string", label: "lectures", name: "lecturesCount", spacing: "12.5rem" },
    ],
    viewableFields: [
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "enum", name: "subject", values: enumValues.course.subject },
      { type: "date", name: "createdAt" },
      { type: "image", name: "image" },
      { type: "boolean", name: "comingSoon" },
      { type: "boolean", name: "isArchived" },
      { type: "number", name: "chaptersCount" },
      { type: "number", name: "lecturesCount" },
      { type: "string", name: "summary" },
      { type: "string", name: "description" },
    ],
    editableFields: [
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "enum", name: "subject", values: enumValues.course.subject },
      { type: "image", name: "image" },
      { type: "boolean", name: "comingSoon" },
      { type: "boolean", name: "isArchived" },
      { type: "string", name: "summary" },
      { type: "string", name: "description" },
    ],
    collectionSections: [],
    documentSections: [{ type: "collection", collection: "chapters" }],
    actions: [
      { type: "create" },
      { type: "delete" },
      { type: "edit" },
      { type: "createChild", collection: "chapters" },
    ],
  },
  {
    name: "chapters",
    icon: <LibraryIcon />,
    isSwappable: true,
    parentCollection: "courses",
    titleField: "name",
    tableFields: [
      { type: "string", label: "name", name: "name", spacing: "25rem" },
      { type: "string", label: "lectures", name: "lecturesCount", spacing: "10rem" },
      { type: "boolean", label: "archived", name: "isArchived", spacing: "minmax(12.5rem, 1fr)" },
    ],
    viewableFields: [
      {
        type: "id",
        name: "course",
        path: "name",
        populate: { path: "course", select: "name" },
        collection: "courses",
      },
      { type: "string", name: "name" },
      { type: "date", name: "createdAt" },
      { type: "boolean", name: "isArchived" },
      { type: "number", name: "lecturesCount" },
    ],
    editableFields: [
      {
        type: "id",
        name: "course",
        path: "name",
        populate: { path: "course", select: "name" },
        collection: "courses",
        isParent: true,
      },
      { type: "string", name: "name" },
      { type: "boolean", name: "isArchived" },
    ],
    collectionSections: [],
    documentSections: [{ type: "collection", collection: "lectures" }],
    actions: [
      { type: "create" },
      { type: "delete" },
      { type: "edit" },
      { type: "createChild", collection: "lectures" },
      { type: "swap" },
    ],
  },
  {
    name: "lectures",
    icon: <BookIcon />,
    isSwappable: true,
    parentCollection: "chapters",
    titleField: "name",
    tableFields: [
      { type: "string", label: "name", name: "name", spacing: "25rem" },
      { type: "string", label: "type", name: "type", spacing: "10rem" },
      { type: "boolean", label: "archived", name: "isArchived", spacing: "minmax(12.5rem, 1fr)" },
    ],
    viewableFields: [
      {
        type: "id",
        name: "chapter",
        path: "name",
        populate: { path: "chapter", select: "name" },
        collection: "chapters",
      },
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "date", name: "createdAt" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    editableFields: [
      {
        type: "id",
        name: "chapter",
        path: "name",
        populate: { path: "chapter", select: "name" },
        collection: "chapters",
        isParent: true,
      },
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    collectionSections: [],
    documentSections: [
      { type: "collection", collection: "contents" },
      { type: "content", name: "_id" },
    ],
    actions: [
      { type: "create" },
      { type: "delete" },
      { type: "edit" },
      { type: "createChild", collection: "contents" },
      { type: "swap" },
    ],
  },
  {
    name: "contents",
    icon: <ArticleIcon fontSize="inherit" />,
    isSwappable: false,
    parentCollection: "lectures",
    tableFields: [
      {
        type: "string",
        label: "lecture",
        name: "lecture",
        path: "name",
        populate: { path: "lecture", select: "name" },
        spacing: "25rem",
      },
      { type: "string", label: "url", name: "url", spacing: "minmax(15rem, 1fr)" },
    ],
    viewableFields: [
      {
        type: "id",
        name: "lecture",
        path: "name",
        populate: { path: "lecture", select: "name" },
        collection: "lectures",
      },
      { type: "string", name: "url" },
    ],
    editableFields: [
      {
        type: "id",
        name: "lecture",
        path: "name",
        populate: { path: "lecture", select: "name" },
        collection: "lectures",
        isParent: true,
      },
      { type: "string", name: "url" },
    ],
    collectionSections: [],
    documentSections: [{ type: "content", name: "lecture", path: "_id" }],
    actions: [{ type: "delete" }, { type: "edit" }],
  },
  {
    name: "users",
    icon: <UserIcon fontSize="inherit" />,
    isSwappable: false,
    titleField: "fullName",
    tableFields: [
      { type: "string", label: "first name", name: "firstName", spacing: "20rem" },
      { type: "string", label: "last name", name: "lastName", spacing: "20rem" },
      { type: "string", label: "email", name: "email", spacing: "minmax(15rem, 1fr)" },
    ],
    viewableFields: [
      { type: "string", label: "first name", name: "firstName" },
      { type: "string", label: "last name", name: "lastName" },
      { type: "string", label: "email", name: "email" },
      { type: "string", label: "stripe customer id", name: "stripeCustomerId" },
      { type: "string", label: "role", name: "role" },
      { type: "image", label: "picture", name: "picture" },
    ],
    editableFields: [{ type: "string", name: "stripeCustomerId" }],
    collectionSections: [],
    documentSections: [{ type: "collection", collection: "orders", sort: "-createdAt" }],
    actions: [{ type: "create" }, { type: "edit" }],
  },
  {
    name: "orders",
    icon: <CartIcon fontSize="inherit" />,
    isSwappable: false,
    parentCollection: "users",
    tableFields: [
      {
        type: "string",
        label: "user",
        name: "user",
        path: "email",
        populate: { path: "user", select: "email" },
        spacing: "25rem",
      },
      { type: "date", label: "created at", name: "createdAt", spacing: "minmax(15rem, 1fr)" },
    ],
    viewableFields: [
      { type: "string", label: "user", name: "user" },
      { type: "date", label: "created at", name: "createdAt" },
    ],
    editableFields: [],
    collectionSections: [],
    documentSections: [],
    actions: [],
  },
];

export default data;

export const getCollectionData = (collectionName) => data.find((i) => i.name === collectionName);

export const getGridColumns = (dataCollection) => {
  let gridTemplateColumns = dataCollection.tableFields.map((field) => field.spacing);
  gridTemplateColumns.push("8rem");
  gridTemplateColumns = gridTemplateColumns.join(" ");
  return gridTemplateColumns;
};

export function getPopulates(fields) {
  const populates = fields.filter((field) => !!field.populate).map((field) => field.populate);
  return populates[0] && JSON.stringify(populates);
}

export function getNestedPath(document, name, path) {
  return document[name] && typeof document[name] === "object" ? document[name][path] : document[name];
}

export function getActionsMap(actions) {
  const map = {};
  actions.forEach((action) => (map[action.type] = action));
  return map;
}

// TODO: Replace "isEditable" with actions, and make that appear in the UI automatically
