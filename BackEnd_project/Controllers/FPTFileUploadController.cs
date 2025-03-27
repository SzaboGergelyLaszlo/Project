using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BackEnd_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FPTFileUploadController : ControllerBase
    {
        [HttpPost]

        public async Task<ActionResult> FileUploadFTP()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string subFolder = "";

                var url = "fpt://ftp.nethely.hu" + subFolder + "/" + fileName;
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                request.Credentials = new NetworkCredential("backend_kalahora", "Bármilehet-2025");
                await using (Stream fptStream = request.GetRequestStream())
                {
                    postedFile.CopyTo(fptStream);
                }
                return Ok(fileName);

            }
            catch (Exception ex)
            {
                return Ok("default.jpg");
            }
        }
    }
}
