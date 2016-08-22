USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcSearchWorkshops
	@workshopSetId int = null,
	@topic varchar(255) = null,
	@startingDtBegin datetime = null,
	@startingDtEnd datetime = null,
	@endingDtBegin datetime = null,
	@endingDtEnd datetime = null,
	@campusID int = null,
	@active bit = null,
	@page int = 1,
	@pageSize int = 10
AS 
    SET NOCOUNT ON;

	DECLARE @sql nvarchar(MAX),
		@nl char(2) = char(13) + char(10)

	SET @sql = 'SELECT WorkshopId, topic, description, targetingGroup, campus, StartDate, EndDate,
				maximum, WorkShopSetID, cutoff, type, reminder_num, reminder_sent, DaysOfWeek, BookingCount, archived
				FROM 		
				(
				SELECT w.id as WorkshopId,
					w.topic,
					w.description,
					w.targetingGroup,
					c.campus,
					w.starting as StartDate,
					w.ending as EndDate,
					w.maximum,
					w.WorkShopSetID,
					w.cutoff,
					w.type,
					w.reminder_num,
					w.reminder_sent,
					p.days as DaysOfWeek,
					dbo.ufnGetBookingCount(w.id) as BookingCount,
					w.archived,
					ROW_NUMBER() OVER (ORDER BY w.Id) AS RowNum
				FROM workshops w
					LEFT JOIN programWorkshops pw
						ON w.id = pw.workshopId
					LEFT JOIN programs p
						ON pw.programId = p.id
					INNER JOIN campus c
						ON w.campusID = c.id
				WHERE 1=1' + @nl

	/* Set the time part of the end date ranges to 23:59 */
	SET @startingDtEnd = dateadd(dd, 1, @startingDtEnd)
	SET @startingDtEnd = dateadd(mi, -1, @startingDtEnd)
	SET @endingDtEnd = dateadd(dd, 1, @endingDtEnd)
	SET @endingDtEnd = dateadd(mi, -1, @endingDtEnd)

	IF @workshopSetId is not null
	BEGIN
		SET @sql = @sql + ' AND w.WorkShopSetID = ' + CONVERT(varchar(5), @workshopSetId) + ' ' + @nl
	END

	IF @topic is not null
	BEGIN
		SET @sql = @sql + ' AND w.topic = ' + @topic + ' ' + @nl
	END

	IF @startingDtBegin is not null AND @startingDtEnd is not null
	BEGIN		
		SET @sql = @sql + ' AND w.starting BETWEEN ''' + CONVERT(varchar(23), @startingDtBegin, 121) + ''' AND ''' + CONVERT(varchar(23), @startingDtEnd, 121) + ''' ' + @nl
	END

	IF @endingDtBegin is not null AND @endingDtEnd is not null
	BEGIN		
		SET @sql = @sql + ' AND w.ending BETWEEN ''' + CONVERT(varchar(23), @endingDtBegin, 121) + ''' AND ''' + CONVERT(varchar(23), @endingDtEnd, 121) + ''' ' + @nl
	END

	IF @campusID is not null
	BEGIN
		SET @sql = @sql + ' AND w.campusID = ' + CONVERT(varchar(5), @campusID) + ' ' + @nl
	END

	IF @active is not null
	BEGIN
		IF @active = 1
		BEGIN
			SET @sql = @sql + ' AND w.archived is null ' + @nl
		END
		ELSE
		BEGIN
			SET @sql = @sql + ' AND w.archived is not null ' + @nl
		END
	END

	SET @sql = @sql + ') AS tbl WHERE tbl.RowNum BETWEEN ' +  CONVERT(varchar(5), ((@page-1)*@pageSize)+1) + ' ' + @nl
	SET @sql = @sql + ' AND ' + CONVERT(varchar(5), @page*@pageSize) + ' ' + @nl

	EXEC sp_executesql @sql

	SET NOCOUNT OFF;
GO
