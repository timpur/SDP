USE elssa_booking;
GO

alter PROCEDURE dbo.prcListSessionTypes
	@active bit = 1
AS 
    SET NOCOUNT ON;

	DECLARE @sql nvarchar(MAX),
	@nl char(2) = char(13) + char(10)

	SET @sql = 'SELECT id, abbName, fullName, iscurrent
				FROM sessionsType ' + @nl

	IF @active is not null
	BEGIN
		IF @active = 1
		BEGIN
			SET @sql = @sql + ' WHERE iscurrent = 1 ' + @nl
		END
		ELSE
		BEGIN
			SET @sql = @sql + ' WHERE iscurrent = 0 ' + @nl
		END
	END
	
	EXEC sp_executesql @sql

	SET NOCOUNT OFF;
GO
