using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FPTFileUploadController : ControllerBase
    {

        [Route("FtpServer")]
        [HttpPost]

        public async Task<IActionResult> FileUploadFtp()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string subFolder = "";
                //string subFolder = "/Files/";

                var url = "ftp://ftp.nethely.hu" + subFolder + "/" + fileName;
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                request.Credentials = new NetworkCredential("backend_kalahora", "!SZGL09021992");
                request.Method = WebRequestMethods.Ftp.UploadFile;
                await using (Stream ftpStream = request.GetRequestStream())
                {
                    postedFile.CopyTo(ftpStream);
                }
                return Ok(new { result = fileName, message = "Sikeres feltöltés", Fileurl = url});

            }
            catch (Exception)
            {
                return Ok("default.jpg");
            }
        }
    }
}
