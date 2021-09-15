class C {
    @logMethod
    foo(n: number) {
        return n * 2
    }
}

function logMethod(target: any, key: string, descriptor: any) { // descriptor: Object.getOwnPropertyDescriptor
    return {
        value(...args: any[]) {
            const a = args.map(a => JSON.stringify(a)).join()
            const result = descriptor.value.apply(this, args)
            const r = JSON.stringify(result)
            console.log(`Call: ${key}(${a}) => ${r}`)
            return result
        }
    }
}

new C().foo(2) // Call: foo(2) => 4
