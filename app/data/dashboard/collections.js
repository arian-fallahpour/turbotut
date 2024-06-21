import SchoolIcon from "@mui/icons-material/SchoolRounded";
import LocalLibraryIcon from "@mui/icons-material/LocalLibraryRounded";
import BookIcon from "@mui/icons-material/BookRounded";
import enumValues from "../enum-values";

const data = [
  {
    name: "courses",
    icon: <SchoolIcon fontSize="inherit" />,
    tableFields: [
      { label: "name", name: "name", spacing: "25rem" },
      { label: "subject", name: "subject", spacing: "1fr" },
      { label: "chapters", name: "chaptersCount", spacing: "12.5rem" },
      { label: "lectures", name: "lecturesCount", spacing: "12.5rem" },
    ],
    viewableFields: [
      { type: "string", name: "name" },
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
      { type: "enum", name: "subject", values: enumValues.course.subject },
      { type: "image", name: "image" },
      { type: "boolean", name: "comingSoon" },
      { type: "boolean", name: "isArchived" },
      { type: "string", name: "summary" },
      { type: "string", name: "description" },
    ],
    collectionSections: [],
    documentSections: [
      {
        type: "collection",
        collection: "chapters",
      },
    ],
  },
  {
    name: "chapters",
    icon: <LocalLibraryIcon fontSize="inherit" />,
    tableFields: [
      { label: "name", name: "name", spacing: "25rem" },
      { label: "lectures", name: "lecturesCount", spacing: "1fr" },
    ],
    viewableFields: [
      { type: "id", name: "course", collection: "courses", isParentId: true },
      { type: "string", name: "name" },
      { type: "date", name: "createdAt" },
      { type: "boolean", name: "isArchived" },
      { type: "number", name: "lecturesCount" },
    ],
    editableFields: [
      { type: "id", name: "course", collection: "courses", isParentId: true },
      { type: "string", name: "name" },
      { type: "boolean", name: "isArchived" },
    ],
    collectionSections: [],
    documentSections: [{ type: "collection", collection: "lectures" }],
  },
  {
    name: "lectures",
    icon: <BookIcon fontSize="inherit" />,
    tableFields: [{ label: "name", name: "name", spacing: "1fr" }],
    viewableFields: [
      { type: "id", name: "chapter", collection: "chapters", isParentId: true },
      { type: "string", name: "name" },
      { type: "date", name: "createdAt" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    editableFields: [
      { type: "id", name: "chapter", collection: "chapters", isParentId: true },
      { type: "string", name: "name" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    collectionSections: [],
    documentSections: [{ type: "content" }],
  },
];

export default data;
