import api from "../../api/api";
import { types } from "../types/types";
import swal from "sweetalert";
import {
  closeModalChangePass,
  ResetPass,
  StartLoading,
  StopLoading,
} from "../actions/uiActions";
import { FiltersEmptyFilter } from "../../helpers/FiltersEmptyFilter";

export const StartGetCourses = (jwt) => {
  return async (dispatch) => {
    dispatch(FiltersEmptyFilter());
    dispatch(StartLoading());
    let dataJwt = JSON.parse(atob(jwt.split(".")[1]));
    try {
      const { data } = await api.get(
        `/api/course/${dataJwt.teacher_id}/teacher`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      dispatch(GetCourses(data));
      dispatch(StopLoading());
    } catch (error) {
      console.error(error);
    }
  };
};

const GetCourses = (data) => ({
  type: types.teacherGetCourse,
  payload: data,
});

export const ChoosenCourse = (course) => ({
  type: types.teacherChooseCourse,
  payload: course,
});

export const StartAddCourse = (jwt, values, idTeacher) => {
  return async (dispatch) => {
    try {
      const { data } = await api.post(
        "api/course",
        { ...values, teacher_id: idTeacher },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(data);
      dispatch(StartGetCourses(jwt));
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartEditCourse = (jwt, values) => {
  return async (dispatch) => {
    try {
      let { data } = await api.put(
        `/api/course/${values.course_id}`,
        {
          name: values.name,
          period: values.period,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(data);
      dispatch(StartGetCourses(jwt));
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartDeleteCourse = (jwt, idCourse) => {
  return async (dispatch) => {
    try {
      let { data } = await api.delete(`/api/course/${idCourse}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(data);
      dispatch(StartGetCourses(jwt));
    } catch (error) {
      console.error(error);
    }
  };
};

export const startGetDocumentsByCourse = (jwt, courseId) => {
  return async (dispatch) => {
    try {
      dispatch(FiltersEmptyFilter());
      dispatch(StartLoading());
      const documentsByCourse = api.get(`/api/document/${courseId}/course`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const examByCourse = api.get(`/api/exam/${courseId}/course`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const [documentsByCourseRes, examByCourseRes] = await Promise.all([
        documentsByCourse,
        examByCourse,
      ]);

      const newDocumentsByCourse = documentsByCourseRes.data.data.map((el) => ({
        id: el.document_id,
        ...el,
      }));
      const newExamByCourse = examByCourseRes.data.data.map((el) => ({
        id: el.exam_id,
        ...el,
      }));
      dispatch(
        GetDocumentsByCourse({
          err: false,
          message: "Documents and Exam found succesfully!",
          data: [...newDocumentsByCourse, ...newExamByCourse],
        })
      );
      dispatch(StopLoading());
    } catch (error) {
      console.error(error);
    }
  };
};

const GetDocumentsByCourse = (data) => ({
  type: types.teacherGetDocumentsByCourse,
  payload: data,
});

export const ChooseDocument = (document) => ({
  type: types.teacherChooseDocument,
  payload: document,
});

export const StartDeleteDocumentByCourse = (
  jwt,
  documentType,
  documentId,
  courseId
) => {
  return async (dispatch) => {
    try {
      if (documentType === 0) {
        let { data } = await api.delete(`/api/document/${documentId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log(data);
      } else if (documentType === 1) {
        let { data } = await api.delete(`/api/exam/${documentId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log(data);
      }
      dispatch(startGetDocumentsByCourse(jwt, courseId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartAddDocumentsByCourse = (
  jwt,
  formData,
  type,
  values,
  courseId
) => {
  return async (dispatch) => {
    try {
      if (type === 0) {
        let { data } = await api.post("/api/document", formData, {
          params: {
            name: values.name,
            course_id: courseId,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
      } else if (type === 1) {
        let { data } = await api.post("/api/exam", formData, {
          params: {
            name: values.name,
            course_id: courseId,
            num_of_questions: values.numberQuestions,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
      }
      dispatch(startGetDocumentsByCourse(jwt, courseId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartGetStudentByCourse = (jwt, courseId) => {
  return async (dispatch) => {
    try {
      dispatch(FiltersEmptyFilter());
      dispatch(StartLoading());
      let { data } = await api.get("api/enrollment/studentByCourse", {
        params: {
          course_id: courseId,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(data);
      dispatch(GetStudentByCourse(data));
      dispatch(StopLoading());
    } catch (error) {}
  };
};

const GetStudentByCourse = (data) => ({
  type: types.teacherGetStudentByCourse,
  payload: data,
});

export const ChooseStudent = (student) => ({
  type: types.teacherChooseStudent,
  payload: student,
});

export const StartAddStudentToACourse = (jwt, values) => {
  return async (dispatch) => {
    try {
      const { data } = await api.post(
        "/api/enrollment",
        {
          course_id: values.courseId,
          student_id: values.studentId,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(data);
      dispatch(StartGetStudentByCourse(jwt, values.courseId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartDeleteStudentFromACourse = (jwt, student) => {
  return async (dispatch) => {
    try {
      const { data } = await api.delete("/api/enrollment", {
        params: {
          course_id: student.course_id,
          student_id: student.student_id,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(data);
      dispatch(StartGetStudentByCourse(jwt, student.course_id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartGetpendingExam = (jwt, courseId) => {
  return async (dispatch) => {
    try {
      dispatch(FiltersEmptyFilter());
      dispatch(StartLoading());
      let { data } = await api.get(`api/answer/${courseId}/exam`, {
        params: {
          course_id: courseId,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(data);
      dispatch(GetpendingExam(data));
      dispatch(StopLoading());
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetpendingExam = (data) => ({
  type: types.teacherGetpendingExam,
  payload: data,
});

export const StartGetAnswerExam = (jwt, studentExamId) => {
  return async (dispatch) => {
    try {
      dispatch(StartLoading());
      let { data } = await api.get(`/api/answer/${studentExamId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(data);
      dispatch(GetAnswerExam(data));
      dispatch(StopLoading());
    } catch (error) {
      console.error(error);
    }
  };
};

const GetAnswerExam = (data) => ({
  type: types.teacherGetAnswerExam,
  payload: data,
});

export const StartEvaluatingAnswer = (jwt, answerId, isCorrect) => {
  return async (dispatch) => {
    console.log({ answerId, isCorrect });
    try {
      let { data } = await api.put(
        "/api/answer",
        { answer_id: answerId, is_correct: isCorrect },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartQualification = (jwt, score, studentExam_id) => {
  return async () => {
    try {
      let { data } = await api.post(
        `/api/answer/rate-exam`,
        {
          score,
          studentExam_id,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartResetPassTeacher = (jwt, values) => {
  return async (dispatch) => {
    try {
      let { data } = await api.post(
        "/api/teacher/reset-password",
        {
          currentPassword: values.passCurrent,
          newPassword: values.passNew,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      dispatch(ResetPass(data.message));
      setTimeout(() => {
        dispatch(closeModalChangePass());
      }, 4000);
    } catch (error) {
      dispatch(ResetPass(error.response.data.message));
    }
  };
};

export const StartSetFinalScore = (jwt, course_id, student_id, final_score) => {
  return async (dispatch) => {
    try {
      let { data } = await api.post(
        "/api/course/final-score",
        {
          course_id,
          student_id,
          final_score,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
};

export const StartFilterCourseByName = (jwt, name) => {
  return (dispatch) => {
    if (name === "") {
      dispatch(StartGetCourses(jwt));
    } else {
      dispatch(FilterCourseByName(name));
    }
  };
};

const FilterCourseByName = (name) => ({
  type: types.teacherFilterCourse,
  payload: name,
});

export const StartFilterMaterialByName = (jwt, name, id) => {
  return (dispatch) => {
    if (name === "") {
      dispatch(startGetDocumentsByCourse(jwt, id));
    } else {
      dispatch(FilterMaterialByName(name));
    }
  };
};

const FilterMaterialByName = (name) => ({
  type: types.teacherFilterMaterial,
  payload: name,
});

export const StartFilterStudentByName = (jwt, name, id) => {
  return (dispatch) => {
    if (name === "") {
      dispatch(StartGetStudentByCourse(jwt, id));
    } else {
      dispatch(FilterStudentByName(name));
    }
  };
};

const FilterStudentByName = (name) => ({
  type: types.teacherFilterStudent,
  payload: name,
});

export const StartFilterExamByName = (jwt, name, id) => {
  return (dispatch) => {
    if (name === "") {
      dispatch(StartGetpendingExam(jwt, id));
    } else {
      dispatch(FilterExamByName(name));
    }
  };
};

const FilterExamByName = (name) => ({
  type: types.teacherFilterExamPending,
  payload: name,
});
