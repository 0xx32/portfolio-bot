export const isAdmin = (id: number) => process.env.ADMIN_IDS!.split(',').includes(String(id))
