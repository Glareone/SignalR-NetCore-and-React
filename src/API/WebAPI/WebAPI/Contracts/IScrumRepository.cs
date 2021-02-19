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

        Task<bool> RemoveUserFromBoard(Guid boardId, Guid userId);

        Task<List<User>> GetUsersFromBoard(Guid boardId);

        Task<bool> UpdateUserPoint(Guid boardId, Guid userId, int point);

        Task<bool> ClearUsersPoint(Guid boardId);

        Task<bool> TogglePoints(Guid boardId, bool state);
    }
}
