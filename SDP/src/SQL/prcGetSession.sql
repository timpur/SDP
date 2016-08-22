USE elssa_booking;
GO

CREATE PROCEDURE dbo.prcGetSession
	@sessionId int
AS 
    SET NOCOUNT ON;

	SELECT id, starting, ending, campus, lecturer, type, archived
	FROM sessions
	WHERE id = @sessionId

	SET NOCOUNT OFF;
GO