using System;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
	public class StudentResponse : Response
	{
		public Student Result
		{
			get;
			set;
		}
	}
}
