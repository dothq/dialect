export const diff = (a: any, b: any) => {
    return Object.keys(b).reduce((diff, key) => {
        if (a[key] === b[key]) return diff
        return {
          ...diff,
          [key]: b[key]
        }
    }, {});
}