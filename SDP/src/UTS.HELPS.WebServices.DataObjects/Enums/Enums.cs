using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace UTS.HELPS.WebServices.DataObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Gender
    {
        X = 0,
        M = 1,
        F = 2
    }
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Degree
    {
        N = 0,
        UG = 1,
        PG = 2
    }
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Year
    {
        NotSet = 0,
        Year1 = 1,
        Year2 = 2,
        Year3 = 3,
        Year4 = 4,
        Year5 = 5
    }
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Status
    {
        Permanent = 0,
        International = 1
    }
}
