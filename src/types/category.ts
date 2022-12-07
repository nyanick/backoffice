export type ICategoryCreate = {
    groupId: string
    name: string
}

export type ICategory = ICategoryCreate & {
    categoryId: string
}
