
export type accessToken = {
    id: string,
    email: string,
    firstName: string,
    lastName: string
}

export type refreshToken = Pick<accessToken, "id">