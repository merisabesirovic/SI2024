using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class ApproveUserDto
    {
        public string UserId { get; set; }
    public bool IsApproved { get; set; }
    }
}