USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcCreateWorkshopBooking
	@workshopId int,
	@studentId char(10),
	@userId int
AS 
    SET NOCOUNT ON;

	INSERT INTO dbo.workShops_booking
		(workshopID, studentID, created, creatorID)
	VALUES
		(@workshopId, @studentId, getdate(), @userId)

	SET NOCOUNT OFF;
GO