export interface userInterface {
    id: string,
    email: string
}

export interface profileInterface {
    id: string,
    email: string,
    displayName: string
}

export interface AuthState {
    profile: profileInterface | null; // or undefined if it can be undefined
}

export interface objState {
    auth: AuthState;
}