// redux中的dispatch的例子

type Actions =
    | {
        type: 'INIT'
    }
    | {
        type: 'SYNC'
    }
    | {
        type: 'LOG_IN',
        emailAddress: string
    }
    | {
        type: 'LOG_IN_SUCCESS'
        accessToken: string
    }

// 然后我们定义这个dispatch方法：

declare function dispatch(action: Actions): void

// ok
dispatch({
    type: "INIT"
})

// ok
dispatch({
    type: "LOG_IN_SUCCESS",
    accessToken: "038fh239h923908h"
})

// 但是如何能实现下面的调用呢
dispatch("LOG_IN_SUCCESS", {
    accessToken: "038fh239h923908h"
})

// 首先，利用方括号选择出Action中的所有type，这个技巧很有用

type ActionType = Actions['type'] // "INIT" | "SYNC" | "LOG_IN" | "LOG_IN_SUCCESS"

type ExtractActionParameters<A, T> = A extends { type: T } ? A : never

type Test = ExtractActionParameters<Actions, "LOG_IN"> // { type: "LOG_IN", emailAddress: string }

// 去掉type
type ExcludeTypeField<A> = { [K in Exclude<keyof A, "type">]: A[K] }

type Ts = ExcludeTypeField<{ type: "LOG_IN", emailAddress: string }> // { emailAddress: string }

type ExtractActionParametersWithoutType<A, T> = ExcludeTypeField<ExtractActionParameters<A, T>>

declare function dispatch<T extends ActionType>(
    type: T,
    args: ExtractActionParametersWithoutType<Actions, T>
): void

// ok
dispatch({
    type: "LOG_IN",
    emailAddress: "david.sheldrick@artsy.net"
})

// ok
dispatch("LOG_IN", {
    emailAddress: 'david.sheldrick@artsy.net'
})

// 优化 可以 dispatch_1("SYNC")
type ExtractSimpleAction<A> = A extends any
  ? {} extends ExcludeTypeField<A>
    ? A
    : never
    : never;
  
type SimpleAction = ExtractSimpleAction<Actions>
// type SimpleActionType = {
//     type: 'INIT';
// } | {
//     type: 'SYNC';
// }
type SimpleActionType = SimpleAction['type'] // 'INIT' | 'SYNC'

type ComplexActionType = Exclude<ActionType, SimpleActionType> // "LOG_IN" | "LOG_IN_SUCCESS"


// 简单参数类型
function dispatch_1<T extends SimpleActionType>(type: T): void;
// 复杂参数类型
function dispatch_1<T extends ComplexActionType>(
  type: T,
  args: ExtractActionParametersWithoutType<Actions, T>
): void;
// 实现
dispatch_1("SYNC")
dispatch_1('LOG_IN', {
    emailAddress: 'ssh@qq.com'
  })