using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.User
{
    public class UpdateUserDto
    {
        public string UserName { get; set; }
    public string Email { get; set; }
    public bool? IsApproved { get; set; }
    }
}