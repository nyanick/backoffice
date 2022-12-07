export type IHospitalCreate = {
    name: string
    address: string
    city: string
    managerUserId: string
}

export type IHospital = IHospitalCreate & {
    shortCode: string
    hospitalId: string
}
