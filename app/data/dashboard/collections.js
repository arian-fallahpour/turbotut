import enumValues from "../enum-values";
import SchoolIcon from "@/components/Elements/Icons/SchoolIcon";
import LibraryIcon from "@/components/Elements/Icons/LibraryIcon";
import BookIcon from "@/components/Elements/Icons/BookIcon";
import ArticleIcon from "@/components/Elements/Icons/ArticleIcon";

const data = [
  {
    name: "courses",
    icon: <SchoolIcon />,
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
    documentSections: [
      {
        type: "collection",
        collection: "chapters",
      },
    ],
  },
  {
    name: "chapters",
    icon: <LibraryIcon />,
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
    icon: <BookIcon />,
    tableFields: [
      { label: "name", name: "name", spacing: "25rem" },
      { label: "type", name: "type", spacing: "1fr" },
    ],
    viewableFields: [
      { type: "id", name: "chapter", collection: "chapters", isParentId: true },
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "date", name: "createdAt" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    editableFields: [
      { type: "id", name: "chapter", collection: "chapters", isParentId: true },
      { type: "string", name: "name" },
      { type: "string", name: "slug" },
      { type: "boolean", name: "isArchived" },
      { type: "enum", name: "type", values: enumValues.lecture.type },
    ],
    collectionSections: [],
    documentSections: [{ type: "collection", collection: "contents" }],
  },
  {
    name: "contents",
    icon: <ArticleIcon fontSize="inherit" />,
    tableFields: [
      { label: "lecture", name: "lecture", spacing: "25rem" },
      { label: "url", name: "url", spacing: "1fr" },
    ],
    viewableFields: [
      { type: "id", name: "lecture", collection: "lectures", isParentId: true },
      { type: "string", name: "url" },
    ],
    editableFields: [
      { type: "id", name: "lecture", collection: "lectures", isParentId: true },
      { type: "string", name: "url" },
    ],
    collectionSections: [],
    documentSections: [],
  },
];

export default data;
