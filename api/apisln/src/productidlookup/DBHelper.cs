using System;
using System.Data.SqlClient;
using System.Text;

public class DBHelper
{
    public static SqlConnection GetConnection()
    {
        SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();

                builder.DataSource = "pbmymy.database.windows.net"; 
                builder.UserID = "mymydbam";            
                builder.Password = "adminL@01";     
                builder.InitialCatalog = "mymyOne";
         
                SqlConnection connection = new SqlConnection(builder.ConnectionString);
                return connection;
    }
}