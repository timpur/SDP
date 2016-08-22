USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcGetWorkshop
	@workshopId int
AS 
    SET NOCOUNT ON;

	SELECT id, topic, description, targetingGroup, campusID, starting, ending, maximum, cutoff, 
		workshopsetid, type, reminder_num, reminder_sent, dbo.ufnGetBookingCount(id) as BookingCount, archived
	FROM workshops
	WHERE id = @workshopId

	SET NOCOUNT OFF;
GO