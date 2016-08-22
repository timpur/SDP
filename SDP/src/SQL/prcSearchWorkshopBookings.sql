USE elssa_booking;
GO

alter PROCEDURE dbo.prcSearchWorkshopBookings
	@studentID char(10) = null,
	@startingDtBegin datetime = null,
	@startingDtEnd datetime = null,
	@endingDtBegin datetime = null,
	@endingDtEnd datetime = null,
	@campusId int = null,
	@active bit = null,
	@page int = 1,
	@pageSize int = 10
AS 
    SET NOCOUNT ON;

	DECLARE @sql nvarchar(MAX),
			@nl char(2) = char(13) + char(10)

	SET @sql = 'SELECT BookingId, workshopID, studentID, topic, description, targetingGroup, 
					campusID, starting, ending, maximum, cutoff, canceled, attended, workshopsetid,
					type, reminder_num, reminder_sent, WorkshopArchived, BookingArchived
				FROM 		
				(
				SELECT wb.id as BookingId,
					wb.workshopID,
					wb.studentID,
					w.topic,
					w.description,
					w.targetingGroup,
					w.campusID,
					w.starting,
					w.ending,
					w.maximum,
					w.cutoff,
					wb.canceled,
					wb.attended,
					w.WorkShopSetID,
					w.type,
					w.reminder_num,
					w.reminder_sent,
					w.archived as "WorkshopArchived",
					wb.archived as "BookingArchived",
					ROW_NUMBER() OVER (ORDER BY wb.Id) AS RowNum
				FROM workShops_booking wb
					INNER JOIN workshops w
						ON wb.workshopID = w.id 
				WHERE 1=1' + @nl

	/* Set the time part of the end date ranges to 23:59 */
	SET @startingDtEnd = dateadd(dd, 1, @startingDtEnd)
	SET @startingDtEnd = dateadd(mi, -1, @startingDtEnd)
	SET @endingDtEnd = dateadd(dd, 1, @endingDtEnd)
	SET @endingDtEnd = dateadd(mi, -1, @endingDtEnd)

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
			SET @sql = @sql + ' AND w.archived is null AND wb.archived is null ' + @nl
		END
		ELSE
		BEGIN
			SET @sql = @sql + ' AND w.archived is not null AND wb.archived is not null ' + @nl
		END
	END

	SET @sql = @sql + ') AS tbl WHERE tbl.RowNum BETWEEN ' +  CONVERT(varchar(5), ((@page-1)*@pageSize)+1) + ' ' + @nl
	SET @sql = @sql + ' AND ' + CONVERT(varchar(5), @page*@pageSize) + ' ' + @nl

	EXEC sp_executesql @sql

	SET NOCOUNT OFF;
GO
