USE elssa_booking;
GO

CREATE PROCEDURE dbo.prcGetWorkshopBooking
	@workshopId int,
	@studentId char(10)
AS 
    SET NOCOUNT ON;

	SELECT id, workshopID, studentID, canceled, attended, archived
	FROM workShops_booking
	WHERE workshopID = @workshopId AND studentId = @studentId

	SET NOCOUNT OFF;
GO