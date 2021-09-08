/**
 * infer: 最早出现在此 PR 中，表示在 extends 条件语句中待推断的类型变量。
 */

/**
 * 提取函数类型的参数类型
 */
type ParamType<T> = T extends (param: infer P) => any ? P : T;


interface User {
    name: string;
    age: number;
}

type Func = (user: User) => void

type Param = ParamType<Func> // Param = User
type AA = ParamType<string> // AA = string

/**
 * 提取函数类型的返回值类型
 */
type ReturnTypes<T> = T extends (...args: any[]) => infer P ? P : any

type RFunc = () => User
type BB = ReturnTypes<RFunc> // BB = User

/**
 * 提取构造函数中参数（实例）类型
 */

/**
 * 一个构造函数可以使用 new 来实例化，因此它的类型通常表示如下
 */

type Constructor = new (...args: any[]) => any;
// 当 infer 用于构造函数类型中，可用于参数位置 new (...args: infer P) => any; 和返回值位置 new (...args: any[]) => infer P;

// 获取参数类型
type ConstructorParameter<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never

// 获取实例类型
type InstanceTypes<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any

class TestClass {
    constructor(name: string, age: number) {
        
    }
}

type Params = ConstructorParameter<typeof TestClass> // [string, number]

type Instance = InstanceTypes<typeof TestClass> // TestClass

/**
 * 其他用例
 */

// tuple 转 union ，如：[string, number] -> string | number

// 方法1
type ElementOf<T> = T extends Array<infer E> ? E : never

type TTuple = [string, number];
type ToUnion = ElementOf<TTuple> // string | number
// 方法2
type Res = TTuple[number]

type UnionToTuple<Union> = Union extends infer A | infer B ? [A, B] : never

interface Module {
    count: number;
    message: string;
    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
    syncMethod<T, U>(action: Action<T>): Action<U>;
  }
interface Action<T> {
    payload?: T
    type: string
}

//   要得到 
//   type Result {
//     asyncMethod<T, U>(input: T): Action<U>;
//     syncMethod<T, U>(action: T): Action<U>;
//   }

type FunctionName<T> = {
    [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]
type FunctionKey = FunctionName<Module> // asyncMethod | syncMethod

type Connect = (module: Module) => {
    [T in FunctionKey]: Module[T]
}

type needConnect = ReturnTypes<Connect>

type Result = {
    [P in FunctionKey]: needConnect[P] extends <T, U>(input: Promise<T>) => Promise<Action<U>> ? <T, U>(input: T) => Action<U> : <T, U>(input: T) => Action<U>
}


  