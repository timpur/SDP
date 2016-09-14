using System.Linq;
using UTS.HELPS.WebServices.DataObjects.Requests;

namespace UTS.HELPS.WebServices.DataAccess
{
    public class StudentDb
    {
        public static void RegisterStudent(StudentReg studentReg)
        {
            string gender = studentReg.Gender.HasValue ? studentReg.Gender.ToString() : null;

            using (HELPSEntities ctx = new HELPSEntities())
            {
                ctx.prcCreateStudent(studentReg.StudentId, studentReg.DateOfBirth, gender, studentReg.Degree.ToString(),
                    studentReg.Year.ToString(), studentReg.Status.ToString(), studentReg.FirstLanguage, studentReg.CountryOrigin,
                    studentReg.Background,
                    studentReg.HSC, studentReg.HSCMark, studentReg.IELTS, studentReg.IELTSMark,
                    studentReg.TOEFL, studentReg.TOEFLMark, studentReg.TAFE, studentReg.TAFEMark,
                    studentReg.CULT, studentReg.CULTMark, studentReg.InsearchDEEP, studentReg.InsearchDEEPMark,
                    studentReg.InsearchDiploma, studentReg.InsearchDiplomaMark, studentReg.FoundationCourse,
                    studentReg.FoundationCourseMark,
                    studentReg.CreatorId, studentReg.DegreeDetails, studentReg.AltContact, studentReg.PreferredName);
            }
        }

        public static Student GetStudent(string studentId)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcGetStudent(studentId).FirstOrDefault();
            }
        }

        public static void UpdateStudentInformation(StudentUpdate student)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                ctx.prcUpdateStudent(
                    student.StudentId, student.PreferredName, student.AltContact, student.GenderString(), student.Degree.ToString(),
                    student.Year.ToString(), student.Status.ToString(), student.FirstLanguage, 
                    student.CountryOrigin, student.ModifierID, student.Background,
                    student.HSC, student.HSCMark, student.IELTS, student.IELTSMark, student.TOEFL, 
                    student.TOEFLMark, student.TAFE, student.TAFEMark,
                    student.CULT, student.CULTMark, student.InsearchDEEP, student.InsearchDEEPMark,
                    student.InsearchDiploma, student.InsearchDiplomaMark, student.FoundationCourse, student.FoundationCourseMark
                    );
            }
        }
    }
}
