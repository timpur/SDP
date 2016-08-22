USE elssa_booking;
GO

CREATE PROCEDURE dbo.prcCreateStudent
	@studentID char(10),
	@dob datetime = null,
	@gender char(5) = null,
	@degree char(5),
	@status char(20),
	@first_language nvarchar(50),
	@country_origin nvarchar(50),
	@background ntext = null,
	@HSC bit = null,
	@HSC_mark char(20) = null,
	@IELTS bit = null,
	@IELTS_mark char(20) = null,
	@TOEFL bit = null,
	@TOEFL_mark char(20) = null,
	@TAFE bit = null,
	@TAFE_mark char(20) = null,
	@CULT bit = null,
	@CULT_mark char(20) = null,
	@InsearchDEEP bit = null,
	@InsearchDEEP_mark char(20) = null,
	@InsearchDiploma bit = null,
	@InsearchDiploma_mark char(20) = null,
	@foundationcourse bit = null,
	@foundationcourse_mark char(20) = null,
	@creatorID int,
	@degree_details char(50) = null,
	@alternative_contact text = null,
	@preferred_name nvarchar(50) = null
AS 
    SET NOCOUNT ON;

	INSERT INTO dbo.students
		(studentID, dob, gender, degree, status, first_language, country_origin, background, 
		HSC, HSC_mark, IELTS, IELTS_mark, TOEFL, TOEFL_mark, TAFE, TAFE_mark, CULT, CULT_mark, 
		InsearchDEEP, InsearchDEEP_mark, InsearchDiploma, InsearchDiploma_mark, 
		foundationcourse, foundationcourse_mark, created, creatorID, degree_details, alternative_contact, preferred_name)
	VALUES
		(@studentID, @dob, @gender, @degree, @status, @first_language, @country_origin, @background, 
		@HSC, @HSC_mark, @IELTS, @IELTS_mark, @TOEFL, @TOEFL_mark, @TAFE, @TAFE_mark, @CULT, @CULT_mark, 
		@InsearchDEEP, @InsearchDEEP_mark, @InsearchDiploma, @InsearchDiploma_mark, 
		@foundationcourse, @foundationcourse_mark, getdate(), @creatorID, @degree_details, @alternative_contact, @preferred_name)

	SET NOCOUNT OFF;
GO