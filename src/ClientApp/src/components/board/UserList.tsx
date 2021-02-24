import React, { useState, useEffect, FC } from 'react';
import { getBoardUsers } from '../../api/scrum-poker-api';
import { User } from './user/User';
import { UserModel } from '../../models/user-model';
import { useParams } from 'react-router-dom';
import {
    HubConnectionBuilder,
    HubConnectionState,
    HubConnection,
} from '@microsoft/signalr';


export const UserList: FC<{ state: boolean }> = ({ state }) => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const { id } = useParams();
    const boardId = id as string;
    useEffect(() => {
        if (users.length === 0) {
            getUsers();
        }
        setUpSignalRConnection(boardId).then((con) => {
            //connection = con;
        });
    }, []);

    const getUsers = async () => {
        const users = await getBoardUsers(boardId);
        setUsers(users);
    };

    const setUpSignalRConnection = async (boardId: string) => {
        const connection = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_BASE_URL}/scrumboardhub`)
            .withAutomaticReconnect()
            .build();

        connection.on('Message', (message: string) => {
            console.log('Message', message);
        });
        connection.on('UsersAdded', (users: UserModel[]) => {
            setUsers(users);
        });

        try {
            await connection.start();
        } catch (err) {
            console.log(err);
        }

        if (connection.state === HubConnectionState.Connected) {
            connection.invoke('SubscribeToBoard', boardId).catch((err: Error) => {
                return console.error(err.toString());
            });
        }

        return connection;
    };
    return (
        <div className="container">
            {users.map((u) => (
                <User
                    key={u.userId}
                    user={u}
                    /*hiddenState={state}*/ />
            ))}
        </div>
    );
};