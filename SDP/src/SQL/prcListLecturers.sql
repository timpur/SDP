USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcListLecturers
	@active bit = null
AS 
    SET NOCOUNT ON;

	DECLARE @sql nvarchar(MAX),
		@nl char(2) = char(13) + char(10)


	SET @sql = 'SELECT id, staffID, first_name, last_name, email, inactive, archived
				FROM lecturers ' + @nl

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