import SchoolIcon from "@mui/icons-material/SchoolRounded";
import LocalLibraryIcon from "@mui/icons-material/LocalLibraryRounded";
import BookIcon from "@mui/icons-material/BookRounded";

const data = [
  {
    name: "courses",
    icon: <SchoolIcon fontSize="inherit" />,
    tableFields: [
      { label: "name", field: "name", spacing: "25rem" },
      { label: "subject", field: "subject", spacing: "1fr" },
      { label: "chapters", field: "chaptersCount", spacing: "12.5rem" },
      { label: "lectures", field: "lecturesCount", spacing: "12.5rem" },
    ],
    viewableFields: [
      { type: "string", field: "name" },
      { type: "string", field: "subject" },
      { type: "date", field: "createdAt" },
      { type: "string", field: "image" },
      { type: "boolean", field: "comingSoon" },
      { type: "boolean", field: "isArchived" },
      { type: "number", field: "chaptersCount" },
      { type: "number", field: "lecturesCount" },
      { type: "string", field: "summary" },
      { type: "string", field: "description" },
    ],
    editableFields: [
      { type: "string", field: "name" },
      { type: "string", field: "subject" },
      { type: "string", field: "image" },
      { type: "boolean", field: "comingSoon" },
      { type: "boolean", field: "isArchived" },
      { type: "string", field: "summary" },
      { type: "string", field: "description" },
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
      { label: "name", field: "name", spacing: "25rem" },
      { label: "lectures", field: "lecturesCount", spacing: "1fr" },
    ],
    viewableFields: [
      { type: "string", field: "name" },
      { type: "date", field: "createdAt" },
      { type: "boolean", field: "isArchived" },
      { type: "number", field: "lecturesCount" },
    ],
    editableFields: [
      { type: "string", field: "name" },
      { type: "boolean", field: "isArchived" },
    ],
    collectionSections: [],
    documentSections: [
      {
        type: "collection",
        collection: "lectures",
      },
    ],
  },
  {
    name: "lectures",
    icon: <BookIcon fontSize="inherit" />,
    tableFields: [{ label: "name", field: "name", spacing: "1fr" }],
    viewableFields: [
      { type: "string", field: "name" },
      { type: "date", field: "createdAt" },
      { type: "boolean", field: "isArchived" },
      { type: "string", field: "type" },
    ],
    editableFields: [
      { type: "string", field: "name" },
      { type: "date", field: "createdAt" },
      { type: "boolean", field: "isArchived" },
      { type: "string", field: "type" },
    ],
    collectionSections: [],
    documentSections: [],
  },
];

export default data;
