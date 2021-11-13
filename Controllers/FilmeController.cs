using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CinematrixAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json.Serialization;

namespace CinematrixAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FilmeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]        
        public JsonResult Get()
        {
            string query = @"  
                    select Id, Titulo from Filme";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CinematrixAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Filme filme)
        {
            string query = @"  
                    insert into Filme values   
                    ('" + filme.Titulo + @"')  
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CinematrixAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Filme filme)
        {
            string query = @"  
                    update Filme set   
                    Titulo = '" + filme.Titulo + @"'  
                    where Id = " + filme.Id + @"   
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CinematrixAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"  
                    delete from Filme  
                    where Id = " + id + @"   
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CinematrixAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
