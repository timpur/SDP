USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcUpdateSessionBooking
	@sessionId int,
	@studentId char(10),
	@cancel bit = null,
	@assisstance char(20) = null,
	@reason ntext = null,
	@attended int = null,
	@waitingID int = null,
	@isgroup int = null,
	@numpeople char(10) = null,
	@lecturercomment ntext = null,
	@learningissues nvarchar(50) = null,
	@islocked int = null,
	@assigntype nvarchar(50) = null,
	@assigntypeOther nvarchar(50) = null,
	@subject nvarchar(100) = null,
	@appointments nvarchar(50) = null,
	@appointmentsOther nvarchar(50) = null,
	@assisstanceText ntext = null,
	@userId int
AS 
    SET NOCOUNT ON;

	IF @cancel is not null
	BEGIN
		UPDATE bookings
		SET cancel = @cancel, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @assisstance is not null
	BEGIN
		UPDATE bookings
		SET assisstance = @assisstance, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @reason is not null
	BEGIN
		UPDATE bookings
		SET reason = @reason, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @attended is not null
	BEGIN
		UPDATE bookings
		SET attended = @attended, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @waitingID is not null
	BEGIN
		UPDATE bookings
		SET waitingID = @waitingID, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @isgroup is not null
	BEGIN
		UPDATE bookings
		SET isgroup = @isgroup, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @numpeople is not null
	BEGIN
		UPDATE bookings
		SET numpeople = @numpeople, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @lecturercomment is not null
	BEGIN
		UPDATE bookings
		SET lecturercomment = @lecturercomment, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @learningissues is not null
	BEGIN
		UPDATE bookings
		SET learningissues = @learningissues, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @islocked is not null
	BEGIN
		UPDATE bookings
		SET islocked = @islocked, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @assigntype is not null
	BEGIN
		UPDATE bookings
		SET assigntype = @assigntype, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @assigntypeOther is not null
	BEGIN
		UPDATE bookings
		SET assigntypeOther = @assigntypeOther, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @subject is not null
	BEGIN
		UPDATE bookings
		SET subject = @subject, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @appointments is not null
	BEGIN
		UPDATE bookings
		SET appointments = @appointments, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @appointmentsOther is not null
	BEGIN
		UPDATE bookings
		SET appointmentsOther = @appointmentsOther, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	IF @assisstanceText is not null
	BEGIN
		UPDATE bookings
		SET assisstanceText = @assisstanceText, modified = getdate(), modifierId = @userId
		WHERE sessionId = @sessionId AND studentId = @studentId
	END

	SET NOCOUNT OFF;
GO