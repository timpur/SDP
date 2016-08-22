USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcCancelWorkshopBooking
	@workshopId int,
	@studentId char(10),
	@userId int
AS 
    SET NOCOUNT ON;

	DECLARE @studentId_waiting char(10);

	-- Remove the booking
	UPDATE workShops_booking
	SET archived = getdate(), archiverID = @userId
	WHERE workshopID = @workshopId AND studentID = @studentId;

	-- Find the next waiting
	SELECT TOP(1) @studentId_waiting = studentId
	FROM workShops_waiting
	WHERE workshopID = @workshopId AND archived is null
	ORDER BY created;

	-- Create booking for next waiting (if it exists)
	IF @studentId_waiting is not null
	BEGIN
		INSERT INTO dbo.workShops_booking
			(workshopID, studentID, created, creatorID)
		VALUES
			(@workshopId, @studentId_waiting, getdate(), @userId);

		-- Remove newly booked from waiting
		UPDATE workShops_waiting
		SET archived = getdate(), archiverID = @userId
		WHERE workshopID = @workshopId AND studentID = @studentId_waiting;
	END

	SET NOCOUNT OFF;
GO