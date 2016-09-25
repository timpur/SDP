using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

public static class MyExtensions
{
    public static T Trim<T>(this T obj)
    {
        try
        {
            List<PropertyInfo> properties = obj.GetType().GetProperties().Where(p => p.PropertyType == typeof(string)).ToList();
            foreach (PropertyInfo property in properties)
            {
                if (property.GetValue(obj) != null)
                {
                    string value = (string)property.GetValue(obj);
                    property.SetValue(obj, value.Trim());
                }
            }
            return obj;
        }
        catch (Exception ex)
        {
            return obj;
        }
    }
}
