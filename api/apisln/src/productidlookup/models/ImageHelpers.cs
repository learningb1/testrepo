using System;
using System.IO;
public class ImageHelpers
{
    public static MemoryStream ConvertFromBase64(string base64encodedstring)
        {
            MemoryStream stream;

            var bytes = Convert.FromBase64String(base64encodedstring);

            stream = new MemoryStream(bytes);
            stream.Seek(0,SeekOrigin.Begin);

            return stream;
        }

}