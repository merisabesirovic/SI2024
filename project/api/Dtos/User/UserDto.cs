using System.Collections.Generic;

namespace api.Dtos.User
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool IsApproved { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
