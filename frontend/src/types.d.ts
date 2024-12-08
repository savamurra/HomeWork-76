export interface Message {
    message: string;
    author: string;
}

export interface MessageMutation {
    message: string;
    author: string;
    dateTime: string;
    id: string;
}