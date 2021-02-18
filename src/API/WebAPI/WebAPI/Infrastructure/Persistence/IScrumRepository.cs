using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Contracts;

namespace WebAPI.Infrastructure.Persistence
{
    public interface IScrumRepository
    {
        Task<bool> AddBoard(ScrumBoard scrumBoard);
        Task<bool> AddUserToBoard(Guid boardId, User user);
        Task<bool> ClearUsersPoint(Guid boardId);
        Task<IList<User>> GetUsersFromBoard(Guid boardId);
        Task<bool> UpdateUserPoint(Guid boardId, Guid userId, int point);
    }
}
