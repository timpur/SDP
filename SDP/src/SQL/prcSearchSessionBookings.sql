USE elssa_booking;
GO

ALTER PROCEDURE dbo.prcSearchSessionBookings
	@studentID char(10) = null,
	@startingDtBegin datetime = null,
	@startingDtEnd datetime = null,
	@endingDtBegin datetime = null,
	@endingDtEnd datetime = null,
	@campus nvarchar(50) = null,
	@lecturerID int = null,
	@sessionTypeID int = null,
	@active bit = null,
	@page int = 1,
	@pageSize int = 10
AS 
    SET NOCOUNT ON;

	DECLARE @sql nvarchar(MAX),
			@nl char(2) = char(13) + char(10)

	SET @sql = 'SELECT BookingId, SessionId, StartDate, EndDate, Campus, LecturerFirstName, LecturerLastName, LecturerEmail,
					SessionTypeAbb, SessionType, Cancel, Assistance, Reason, Attended, WaitingID, IsGroup, NumPeople, 
					LecturerComment, LearningIssues, IsLocked, AssignmentType, AssignTypeOther, Subject, AppointmentType,
					AppointmentsOther, AssistanceText, archived
				FROM 		
				(
				SELECT b.Id as BookingId, 
					s.Id as SessionId,
					s.starting as StartDate, 
					s.ending as EndDate, 
					s.campus as Campus, 
					l.first_name as LecturerFirstName, 
					l.last_name as LecturerLastName, 
					l.email as LecturerEmail, 
					st.abbName as SessionTypeAbb, 
					st.fullName as SessionType,
					b.cancel as Cancel, 
					b.assisstance as Assistance, 
					b.reason as Reason, 
					b.attended as Attended, 
					b.waitingID as WaitingID,
					b.isgroup as IsGroup, 
					b.numpeople as NumPeople, 
					b.lecturercomment as LecturerComment, 
					b.learningissues as LearningIssues,
					b.islocked as IsLocked, 
					ass.type as AssignmentType, 
					b.assigntypeOther as AssignTypeOther,
					b.subject as Subject, 
					app.type as AppointmentType, 
					b.appointmentsOther as AppointmentsOther, 
					b.assisstanceText as AssistanceText,
					b.archived,
					ROW_NUMBER() OVER (ORDER BY s.Id) AS RowNum
				FROM dbo.sessions s
					INNER JOIN bookings b
						ON s.Id = b.sessionId
					INNER JOIN lecturers l
						ON l.id = s.lecturer
					INNER JOIN sessionsType st
						ON s.type = st.id
					LEFT JOIN assignments ass
						ON ass.id = b.assigntype
					LEFT JOIN appointments app
						ON app.id = b.appointments
				WHERE 1=1' + @nl

	/* Set the time part of the end date ranges to 23:59 */
	SET @startingDtEnd = dateadd(dd, 1, @startingDtEnd)
	SET @startingDtEnd = dateadd(mi, -1, @startingDtEnd)
	SET @endingDtEnd = dateadd(dd, 1, @endingDtEnd)
	SET @endingDtEnd = dateadd(mi, -1, @endingDtEnd)

	IF @studentID is not null
	BEGIN
		SET @sql = @sql + ' AND b.studentID = ' + CONVERT(varchar(10), @studentID) + ' ' + @nl
	END

	IF @startingDtBegin is not null AND @startingDtEnd is not null
	BEGIN		
		SET @sql = @sql + ' AND s.starting BETWEEN ''' + CONVERT(varchar(23), @startingDtBegin, 121) + ''' AND ''' + CONVERT(varchar(23), @startingDtEnd, 121) + ''' ' + @nl
	END

	IF @endingDtBegin is not null AND @endingDtEnd is not null
	BEGIN		
		SET @sql = @sql + ' AND s.ending BETWEEN ''' + CONVERT(varchar(23), @endingDtBegin, 121) + ''' AND ''' + CONVERT(varchar(23), @endingDtEnd, 121) + ''' ' + @nl
	END

	IF @campus is not null
	BEGIN
		SET @sql = @sql + ' AND s.campus LIKE ''%' + @campus + '%'' ' + @nl
	END

	IF @lecturerID is not null
	BEGIN
		SET @sql = @sql + ' AND l.id = ' + CONVERT(varchar(5), @lecturerID) + ' ' + @nl
	END

	IF @sessionTypeID is not null
	BEGIN
		SET @sql = @sql + ' AND st.id = ' + CONVERT(varchar(5), @sessionTypeID) + ' ' + @nl
	END

	IF @active is not null
	BEGIN
		IF @active = 1
		BEGIN
			SET @sql = @sql + ' AND s.archived is null AND b.archived is null ' + @nl
		END
		ELSE
		BEGIN
			SET @sql = @sql + ' AND s.archived is not null AND b.archived is not null ' + @nl
		END
	END

	SET @sql = @sql + ') AS tbl WHERE tbl.RowNum BETWEEN ' +  CONVERT(varchar(5), ((@page-1)*@pageSize)+1) + ' ' + @nl
	SET @sql = @sql + ' AND ' + CONVERT(varchar(5), @page*@pageSize) + ' ' + @nl

	EXEC sp_executesql @sql

	SET NOCOUNT OFF;
GO
