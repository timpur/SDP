USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcListAssignments
	@active bit = null
AS 
    SET NOCOUNT ON;

	DECLARE @sql nvarchar(MAX),
		@nl char(2) = char(13) + char(10)


	SET @sql = 'SELECT id, type, orderItem, iscurrent
				FROM assignments ' + @nl

	IF @active is not null
		BEGIN
			SET @sql = @sql + ' WHERE iscurrent = ' + CONVERT(varchar(2), @active) + ' ' + @nl
		END
	
	EXEC sp_executesql @sql

	SET NOCOUNT OFF;
GO