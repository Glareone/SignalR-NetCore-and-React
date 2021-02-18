using System;
using System.Collections.Generic;

namespace WebAPI.Contracts
{
    public class ScrumBoard
    {
        public Guid Id { get; set; }
        public IList<User> Users { get; set; }
    }
}
