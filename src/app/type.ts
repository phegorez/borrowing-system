export interface profileInterface {
    uid: string,
    email: string,
    photo: string,
    role: string,
    displayName: string, 
    createdDate: string,
    updatedDate: string
}

export interface AuthState {
    profile: profileInterface | null; // or undefined if it can be undefined
}

export interface objState {
    auth: AuthState;
}