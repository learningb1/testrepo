using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;

namespace productidlookup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductIdValidationController : ControllerBase
    {
        // GET api/values
        [HttpGet("{id}")]
        public JsonResult Get(String id)
        {
            bool retval = ValidateProductId(id);

            if (retval)
            {
                return new JsonResult(new { result = "ok" });
            }
            else
            {
                return new JsonResult(new { result = "notfound" });
            }

            
        }

        private bool ValidateProductId(string productId)
        {
            bool returnval = false;
            using(SqlConnection connection = DBHelper.GetConnection())
            {
                string sql = "[dbo].[ValidateProductId]";
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add("@pProductIdCode", SqlDbType.VarChar).Value = productId;
                        SqlParameter retval = new SqlParameter("@pStatus", SqlDbType.Bit);
                        retval.Direction = ParameterDirection.Output;
                        command.Parameters.Add(retval);
                        command.ExecuteNonQuery();
                        int ret = Convert.ToUInt16(command.Parameters["@pStatus"].Value);
                        if (ret > 0)
                        {
                            returnval = true;
                        }
                        
                    }     
            }

            return returnval;

        }
    }


}