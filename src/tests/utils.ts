type ResponseMust = {
    icon: string,
    resume: string | null
}
type ErrorType = {
    type: string
    message: string
}

const ErrJSON = (e: ErrorType) => JSON.stringify({ type: e.type, message: e.message})

export const must = (description: string, fn: any, err?: ErrorType) => {
    const response: ResponseMust = {
        icon: '',
        resume: null
    }
    try {
        fn();
        response.icon = '✅'
    } catch (e: any) {
        console.error(e.message)
        if (err !== undefined) {
        if ( err!.message === e.message && err!.type === e.type ) {
            response.icon = '✅'
        } else {
            response.icon = '❌'
            response.resume = `Error type not same.\nExpected: ${ErrJSON(err)}\nReceived: ${ErrJSON(e)}`
        }
        } else {
        response.icon = '❌'
        response.resume = `Error not received`
        }
    }
    finally {
        console.warn(`${response.icon} ${description}`)
        if (response.resume !== null) console.log(response.resume)
    }
};


export const asserts = (data: any) => {
  return ({
    notNull: () => {
      if(data === null) throw new Error("DATA_NULL");
      return true
    },
    equals: (expexted: any) => {
      if (data === expexted) {
        return true
      }
      throw new Error("NOT_EQUALS");
    }
  })
}
