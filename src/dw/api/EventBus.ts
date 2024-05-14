import postal from 'postal'

// 这里的model是由createCustomModel返回的model
const pub = (model: any, topic: any, data: any, callback: any = undefined) => {
  const { schemaId } = model
  const { key } = model
  const { pageId } = model
  // @ts-ignore
  postal.publish(
    {
      channel: `${pageId}_${schemaId}_${key}`,
      topic,
      data,
    },
    // @ts-ignore
    callback,
  )
}

// 这里的model是由createCustomModel返回的model
const sub = function (model: any, topic: any, callback: any = undefined) {
  const { schemaId } = model
  const { key } = model
  const { pageId } = model
  const handler = postal.subscribe({
    channel: `${pageId}_${schemaId}_${key}`,
    topic,
    callback,
  })
  return handler
}

const unsub = function (handler: any) {
  postal.unsubscribe(handler)
}

export default {
  pub,
  sub,
  unsub,
}
