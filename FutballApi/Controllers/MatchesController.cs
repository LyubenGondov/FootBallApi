using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using FutballApi.Models;

namespace FutballApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MatchesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT TeamOne, TeamTwo, Result FROM Matches";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MatchesAppCon");
            SqlDataReader myReader;

            using (SqlConnection conn=new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand comm = new SqlCommand(query, conn))
                {
                    myReader = comm.ExecuteReader();

                    table.Load(myReader);
                    myReader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Matches matches)
        {
            string query = "INSERT INTO dbo.Matches VALUES('" + matches.TeamOne + "', '" 
                + matches.TeamTwo + "', '" + matches.Result + "')";
            
            string sqlDataSource = _configuration.GetConnectionString("MatchesAppCon");
            
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand comm = new SqlCommand(query, conn))
                {
                    comm.ExecuteScalar();

                    conn.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        //here in JsonBody in Postman we should add MatchesId
        [HttpPut]
        public JsonResult Put(Matches matches)
        {
            string query = "UPDATE dbo.Matches set TeamOne='"+ matches.TeamOne + "', TeamTwo='" +
                matches.TeamTwo + "', Result='" + matches.Result + "' where MatchesId=" + matches.MatchesId;
            
            string sqlDataSource = _configuration.GetConnectionString("MatchesAppCon");
            
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand comm = new SqlCommand(query, conn))
                {
                    comm.ExecuteScalar();

                    conn.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = "DELETE FROM dbo.Matches where MatchesId=" + id;
            
            string sqlDataSource = _configuration.GetConnectionString("MatchesAppCon");            

            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand comm = new SqlCommand(query, conn))
                {
                    comm.ExecuteScalar();
                                        
                    conn.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}