export type IUserCreate = {
    firstName: string
    lastName: string
    phoneNumber: string
    authorities: string[]
    email: string
    bornOn: string
    placeOfBirth: string
    nationality: string
    address: string
    city: string
    country: string
}

export type IUser = IUserCreate & {
    avatarId?: string
    userId: string
    authorities?: string[]
}

export type IAuthority = {
    label: string
    value: string
}
