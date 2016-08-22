USE elssa_booking;
GO

CREATE PROCEDURE dbo.prcGetWorkshopWaiting
	@workshopId int,
	@studentId char(10)
AS 
    SET NOCOUNT ON;

	SELECT id, workshopID, studentID, priority, archived
	FROM workShops_waiting
	WHERE workshopID = @workshopId AND studentId = @studentId

	SET NOCOUNT OFF;
GO