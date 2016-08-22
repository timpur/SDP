USE elssa_booking;
GO

CREATE FUNCTION dbo.ufnGetWorkshopBookingCount(@workshopId int)
RETURNS int 
AS 
BEGIN
    DECLARE @ret int;

	SELECT @ret = count(*)
	FROM workShops_booking
	WHERE workshopID = @workshopId
		AND (canceled <> 1 OR canceled is null);

	IF (@ret IS NULL) 
		SET @ret = 0;

    RETURN @ret;
END;
GO