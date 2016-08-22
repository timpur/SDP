USE elssa_booking;
GO

CREATE FUNCTION dbo.ufnGetWaitingCount(@workshopId int)
RETURNS int 
AS 
BEGIN
    DECLARE @ret int;

	SELECT @ret = count(*)
	FROM workShops_waiting
	WHERE workshopID = @workshopId
		AND archived is null;

	IF (@ret IS NULL) 
		SET @ret = 0;

    RETURN @ret;
END;
GO