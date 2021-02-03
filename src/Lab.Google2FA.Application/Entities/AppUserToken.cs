using System.ComponentModel.DataAnnotations;

namespace Lab.Google2FA.Application.Entities
{
    public class AppUserToken
    {
        [Required]
        public int AppUserId { get; set; }
        [Required]
        [StringLength(128)]
        public string Name { get; set; }
        public string Value { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}