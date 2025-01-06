using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class UpdateRolesDto
    {
        [Required]
        public List<string> Roles { get; set; }
    }
}
