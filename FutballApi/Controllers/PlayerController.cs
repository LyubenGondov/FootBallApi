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
    public class PlayerController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PlayerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT PlayerName, PlayerTeam, PlayerMatches, PlayerGoals FROM Player";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MatchesAppCon");
            SqlDataReader myReader;

            using (SqlConnection conn = new SqlConnection(sqlDataSource))
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
        public JsonResult Post(Player player)
        {
            string query = "INSERT INTO dbo.Player VALUES('" + player.PlayerName + "', '"
                + player.PlayerTeam + "', " + player.PlayerMatches + ", "+ player.PlayerGoals +")";

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

        //here in JsonBody in Postman we should add PlayerId
        [HttpPut]
        public JsonResult Put(Player player)
        {
            string query = "UPDATE dbo.Player set PlayerName='" + player.PlayerName + "', PlayerTeam='" +
                player.PlayerTeam + "', PlayerMatches='" + player.PlayerMatches 
                + "', PlayerGoals="+ player.PlayerGoals+" where PlayerId=" + player.PlayerId;

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
            string query = "DELETE FROM dbo.Player where PlayerId=" + id;

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