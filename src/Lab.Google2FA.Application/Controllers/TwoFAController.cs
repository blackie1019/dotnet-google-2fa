using System.Text.Json;
using GoogleAuthenticatorService.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Lab.Google2FA.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TwoFAController : ControllerBase
    {
        private readonly ILogger<TwoFAController> _logger;
        private readonly TwoFactorAuthenticator _authenticator;

        public TwoFAController(ILogger<TwoFAController> logger, TwoFactorAuthenticator authenticator)
        {
            _logger = logger;
            _authenticator = authenticator;
        }

        [HttpGet("{accountSecretKey}")]
        public string GenerateSetupCode(string accountSecretKey)
        {
            var setupInfo = _authenticator.GenerateSetupCode("Lab.Google2FA", accountSecretKey, 300, 300);
            return JsonSerializer.Serialize(setupInfo);
        }
        
        [HttpGet("currentPin/{accountSecretKey}")]
        public string GetCurrentPIN(string accountSecretKey)
        {
            var result = _authenticator.GetCurrentPIN(accountSecretKey);
            return result;
        }
        
        [HttpGet("Validation/{accountSecretKey}/{currentPin}")]
        public string ValidatePin(string accountSecretKey,string currentPin)
        {
            var result = _authenticator.ValidateTwoFactorPIN(accountSecretKey,currentPin);
            return result.ToString();
        }
    }
}