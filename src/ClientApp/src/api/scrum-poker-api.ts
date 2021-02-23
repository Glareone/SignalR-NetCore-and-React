import { Board } from '../models/board';
import { UserModel } from '../models/user-model';

export const baseURL = process.env.REACT_APP_BASE_URL;
const env = process.env.NODE_ENV;
const scrumPokerURL = `${baseURL}/scrum-poker`;

export const createBoard = async (board: Board): Promise<string> => {
    debugger;
    const result = await apiFetchUpdate(`${scrumPokerURL}/boards`, board);
    return result as string;
};

export const createUser = async (
    boardId: string,
    user: UserModel,
): Promise<string> => {
    debugger;
    const result = await apiFetchUpdate(
        `${scrumPokerURL}/boards/${boardId}/users`,
        user,
    );
    return result as string;
};

export const updateUserPoint = async (
    boardId: string,
    user: UserModel,
): Promise<boolean> => {
    debugger;
    const result = await apiFetchUpdate(
        `${scrumPokerURL}/boards/${boardId}/users`,
        user,
        'PUT',
    );
    return result as boolean;
};

export const deleteUser = async (
    boardId: string,
    userId: string,
): Promise<boolean> => {
    debugger;
    const result = await apiFetchUpdate(
        `${scrumPokerURL}/boards/${boardId}/users/${userId}`,
        null,
        'DELETE',
    );
    return result as boolean;
};

export const togglePointVisibility = async (
    boardId: string,
    state: boolean,
): Promise<boolean> => {
    debugger;
    const result = await apiFetchUpdate(
        `${scrumPokerURL}/boards/${boardId}/${state}`,
        null,
    );
    return result as boolean;
};

export const getBoardUsers = async (boardId: string): Promise<UserModel[]> => {
    const result = await apiFetchGET(`${scrumPokerURL}/boards/${boardId}/users`);
    return result;
};

export const getUser = async (
    boardId: string,
    userId: string,
): Promise<UserModel> => {
    debugger;
    const result = apiFetchGET(
        `${scrumPokerURL}/boards/${boardId}/users/${userId}`,
    );
    return result;
};

export const clearUsersPoint = async (boardId: string) => {
    debugger;
    const result = apiFetchUpdate(`${scrumPokerURL}/boards/${boardId}`, null);
    return result;
};

const apiFetchUpdate = async (
    url: string,
    body: any,
    method: string = 'POST',
): Promise<any> => {
    debugger;
    const response = await fetch(url, {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(body), // body data type must match "Content-Type" header
    });

    return await response.json();
};

const apiFetchGET = async (url: string): Promise<any> => {
    debugger;
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
    });

    return await response.json();
};