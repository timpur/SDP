USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcUpdateWorkshopBooking
	@workshopId int,
	@studentId char(10),
	@canceled int = null,
	@attended int = null,
	@userId int
AS 
    SET NOCOUNT ON;

	IF @canceled is not null
	BEGIN
		UPDATE workShops_booking
		SET canceled = @canceled, modified = getdate(), modifierId = @userId
		WHERE workshopID = @workshopId AND studentId = @studentId
	END

	IF @attended is not null
	BEGIN
		UPDATE workShops_booking
		SET attended = @attended, modified = getdate(), modifierId = @userId
		WHERE workshopID = @workshopId AND studentId = @studentId
	END

	SET NOCOUNT OFF;
GO