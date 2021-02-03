using System.Text.Json;
using GoogleAuthenticatorService.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Lab.Google2FA.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TwoFAController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly TwoFactorAuthenticator _authenticator;

        public TwoFAController(ILogger<WeatherForecastController> logger, TwoFactorAuthenticator authenticator)
        {
            _logger = logger;
            _authenticator = authenticator;
        }

        [HttpGet]
        public string Get()
        {
            var setupInfo = _authenticator.GenerateSetupCode("blackie", "blackie1019@gamil.com", 100, 200);

            return JsonSerializer.Serialize(setupInfo);
        }
    }
}