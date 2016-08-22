USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcCreateWorkshopWaiting
	@workshopId int,
	@studentId char(10),
	@priority int,
	@userId int
AS 
    SET NOCOUNT ON;

	INSERT INTO dbo.workShops_waiting
		(workshopID, studentID, priority, created, creatorID)
	VALUES
		(@workshopId, @studentId, @priority, getdate(), @userId)

	SET NOCOUNT OFF;
GO