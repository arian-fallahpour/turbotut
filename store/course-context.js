import { createContext, useState } from "react";

const CourseContext = createContext({
  course: {},
  currentLecture: {},
});

const CourseProvider = ({ children }) => {
  const [activeLecture, setActiveLecture] = useState("");

  const nextActiveLectureHandler = () =>
    setActiveLecture((prev) => (prev += 1));

  const prevActiveLectureHandler = () =>
    setActiveLecture((prev) => (prev -= 1));

  const courseContext = {
    activeLecture,
    setActiveLecture,
    nextActiveLecture: nextActiveLectureHandler,
    prevActiveLecture: prevActiveLectureHandler,
  };

  return (
    <CourseContext.Provider value={courseContext}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
