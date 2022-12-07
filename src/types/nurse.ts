export type INurseCreate = {
    firstName: string
    lastName: string
    phoneNumber: string
    biography: string
    email: string
    nationality: string
    address: string
    city: string
    country: string
    bornOn: string
    placeOfBirth: string
    avatarId?: string
    nurseId?: string
    userId?: string
    hospitalId: string
}

export type INurseDetails = INurseCreate

export type INurse = {
    biography: string
    nurseId: string
    userId: string
    hospitalId: string
}