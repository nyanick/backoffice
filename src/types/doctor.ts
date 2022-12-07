export type IDoctorCreate = {
    firstName: string
    lastName: string
    specialtyId: string
    phoneNumber: string
    biography: string
    email: string
    nationality: string
    address: string
    city: string
    country: string
    bornOn: string
    placeOfBirth: string
    nationalOrderId: string
    avatarId?: string
    doctorId?: string
    userId?: string
    hospitalIds: string[]
}

export type IDoctorDetails = IDoctorCreate & {
    title: string
}

export type IDoctor = {
    title: string
    biography: string
    doctorId: string
    userId: string
    specialtyId: string
    nationalOrderId: string
    hospitalIds: string[]
}