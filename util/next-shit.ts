const isObj = (what: any) => what !== null && typeof what === "object"

export const makeNextHappy = async (data: any) => {
    for await(let [key, value] of Object.entries(data)) {
        if(value instanceof Date) {
            (data as any)[key] = `${value.toISOString()}`
        } else if(isObj(value)) {
            (data as any)[key] = await makeNextHappy(value);
        }
    }

    return data;
}