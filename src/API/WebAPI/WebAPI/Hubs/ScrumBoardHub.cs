using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Hubs
{
    public class ScrumBoardHub : Hub
    {
        public async override Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("Message", "Connected Successfully!");
        }

        public async Task SubscribeToBoard(Guid boardId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, boardId.ToString());
            await Clients.Caller.SendAsync("Message", "Added to the board successfully");
        }
    }
}
