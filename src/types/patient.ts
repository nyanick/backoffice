export type IPatientEdit = {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    nationality: string
    address: string
    city: string
    country: string
    bornOn: string
    placeOfBirth: string
    avatarId?: string
    patientId?: string
    userId?: string
    gender?: string
    bloodGroup?:string
    rhesusFactor?:string
}

export type IPatientDetails = IPatientEdit

export type IPatient = {
    title: string
    biography: string
    patientId: string
    userId: string
    specialtyId: string
    nationalOrderId: string
}
