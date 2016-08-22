USE elssa_booking;
GO

CREATE PROCEDURE dbo.prcListWorkShopSets
	@active bit = null
AS 
    SET NOCOUNT ON;

	DECLARE @sql nvarchar(MAX),
		@nl char(2) = char(13) + char(10)


	SET @sql = 'SELECT id, name, archived
				FROM WorkShopSet ' + @nl

	IF @active is not null
		BEGIN
			IF @active = 1
				BEGIN
					SET @sql = @sql + ' WHERE archived is null ' + @nl
				END
			ELSE
				BEGIN
					SET @sql = @sql + ' WHERE archived is not null ' + @nl
				END
		END
	
	EXEC sp_executesql @sql

	SET NOCOUNT OFF;
GO