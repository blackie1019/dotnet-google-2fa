using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lab.Google2FA.Application.Entities
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Display(Name = "Login Name")]
        [StringLength(32, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        public string LoginName { get; set; }
        [Required]
        [StringLength(32)]
        public string LoginNameUppercase { get; set; }
        [Required]
        [MaxLength(84, ErrorMessage = "The {0} is max {1} characters long.")]
        public string PasswordHash { get; set; }
        [Display(Name = "MCP")]
        public bool MustChangePassword { get; set; }
        [Display(Name = "2FA")]
        public bool TwoFactorEnabled { get; set; }
        [Display(Name = "Admin")]
        public bool IsAdmin { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
        public virtual ICollection<AppUserToken> AppUserTokens { get; set; }
    }
}