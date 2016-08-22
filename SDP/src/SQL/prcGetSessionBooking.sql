USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcGetSessionBooking
	@sessionId int,
	@studentID char(10)
AS 
    SET NOCOUNT ON;

	SELECT id, studentID, sessionId, cancel, assisstance, reason, attended, waitingID, archived,
		isgroup, numpeople, lecturercomment, learningissues, islocked, assigntype, assigntypeOther, subject,
		appointments, appointmentsOther, assisstanceText
	FROM bookings
	WHERE sessionId = @sessionId AND studentId = @studentID

	SET NOCOUNT OFF;
GO