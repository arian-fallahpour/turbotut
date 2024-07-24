import enumValues from "../enum-values";

import SchoolIcon from "@/components/Elements/Icons/SchoolIcon";
import LibraryIcon from "@/components/Elements/Icons/LibraryIcon";
import BookIcon from "@/components/Elements/Icons/BookIcon";
import ArticleIcon from "@/components/Elements/Icons/ArticleIcon";
import EditIcon from "@/components/Elements/Icons/EditIcon";
import DeleteIcon from "@/components/Elements/Icons/DeleteIcon";
import AddChildIcon from "@/components/Elements/Icons/AddChildIcon";

/**
 * NOTES
 * - editable fields is ALWAYS a subset of viewable fields
 */

const data = [
  {
    name: "courses",
    icon: <SchoolIcon />,
    isSwappable: false,
    tableFields: [
      { label: "name", name: "name", spacing: "25rem" },
      { label: "subject", name: "subject", spacing: "1fr" },
      { label: "chapters", name: "chaptersCount", spacing: "12.5rem" },
      { label: "lectures", name: "lecturesCount", spacing: "12.5rem" },
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
      { type: "delete", label: <DeleteIcon /> },
      { type: "edit", label: <EditIcon /> },
      { type: "insert", label: <AddChildIcon />, collection: "chapters" },
    ],
  },
  {
    name: "chapters",
    icon: <LibraryIcon />,
    isSwappable: true,
    parentCollection: "courses",
    tableFields: [
      { label: "name", name: "name", spacing: "25rem" },
      { label: "lectures", name: "lecturesCount", spacing: "1fr" },
    ],
    viewableFields: [
      { type: "id", name: "course", collection: "courses" },
      { type: "string", name: "name" },
      { type: "date", name: "createdAt" },
      { type: "boolean", name: "isArchived" },
      { type: "number", name: "lecturesCount" },
    ],
    editableFields: [
      { type: "id", name: "course", path: "name", collection: "courses", isParent: true },
      { type: "string", name: "name" },
      { type: "boolean", name: "isArchived" },
    ],
    collectionSections: [],
    documentSections: [{ type: "collection", collection: "lectures" }],
    actions: [
      { type: "delete", label: <DeleteIcon /> },
      { type: "edit", label: <EditIcon /> },
      { type: "insert", label: <AddChildIcon />, collection: "lectures" },
    ],
  },
  {
    name: "lectures",
    icon: <BookIcon />,
    isSwappable: true,
    parentCollection: "chapters",
    tableFields: [
      { label: "name", name: "name", spacing: "25rem" },
      { label: "type", name: "type", spacing: "1fr" },
    ],
    viewableFields: [
      { type: "id", name: "chapter", collection: "chapters" },
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "date", name: "createdAt" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    editableFields: [
      { type: "id", name: "chapter", path: "name", collection: "chapters", isParent: true },
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    collectionSections: [],
    documentSections: [{ type: "collection", collection: "contents" }],
    actions: [
      { type: "delete", label: <DeleteIcon /> },
      { type: "edit", label: <EditIcon /> },
      { type: "insert", label: <AddChildIcon />, collection: "contents" },
    ],
  },
  {
    name: "contents",
    isSwappable: false,
    icon: <ArticleIcon fontSize="inherit" />,
    parentCollection: "lectures",
    tableFields: [
      { label: "lecture", name: "lecture", spacing: "25rem" },
      { label: "url", name: "url", spacing: "1fr" },
    ],
    viewableFields: [
      { type: "id", name: "lecture", collection: "lectures" },
      { type: "string", name: "url" },
    ],
    editableFields: [
      { type: "id", name: "lecture", path: "name", collection: "lectures", isParent: true },
      { type: "string", name: "url" },
    ],
    collectionSections: [],
    documentSections: [],
    actions: [
      { type: "delete", label: <DeleteIcon /> },
      { type: "edit", label: <EditIcon /> },
    ],
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
