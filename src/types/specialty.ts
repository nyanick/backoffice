export type ISpecialtyCreate = {
    label: string
    title: string
    description: string
}

export type ISpecialty = ISpecialtyCreate & {
    specialtyId: string
}
