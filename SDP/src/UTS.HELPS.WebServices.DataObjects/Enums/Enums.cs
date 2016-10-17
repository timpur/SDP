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

    public enum NotifcationTime
    {
        Min_30 = 1,
        Hr_1 = 2,
        Hr_2 = 3,
        Hr_4 = 4,
        Hr_6 = 5,
        Hr_12 = 6,
        D_1 = 7,
        D_2 = 8,
        D_3 = 9,
        D_4 = 10
    }
}
