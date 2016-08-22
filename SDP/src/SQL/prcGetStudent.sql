USE elssa_booking;
GO

CREATE PROCEDURE dbo.prcGetStudent
	@studentID char(10)
AS 
    SET NOCOUNT ON;

	SELECT studentID, dob, gender, degree, status, first_language, country_origin, background, 
		HSC, HSC_mark, IELTS, IELTS_mark, TOEFL, TOEFL_mark, TAFE, TAFE_mark, CULT, CULT_mark, 
		InsearchDEEP, InsearchDEEP_mark, InsearchDiploma, InsearchDiploma_mark, 
		foundationcourse, foundationcourse_mark, created, creatorID, degree_details, alternative_contact, preferred_name
	FROM students
	WHERE studentID = @studentID

	SET NOCOUNT OFF;
GO