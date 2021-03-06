import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Message } from './message.class'
import createModel from '../../models/message.model'
import hooks from './message.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'message': Message & ServiceAddons<any>;
  }
}

export default (app: Application): any => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/message', new Message(options, app))

  const service = app.service('message')

  service.hooks(hooks)

  service.publish('created', async (data): Promise<any> => {
    const channel = await app.service('channel').get(data.channelId)
    let targetIds = []
    if (channel.channelType === 'party') {
      const partyUsers = await app.service('party-user').find({
        query: {
          $limit: 1000,
          partyId: channel.partyId
        }
      })

      targetIds = (partyUsers as any).data.map((partyUser) => {
        return partyUser.userId
      })
    } else if (channel.channelType === 'group') {
      const groupUsers = await app.service('group-user').find({
        query: {
          $limit: 1000,
          groupId: channel.groupId
        }
      })

      targetIds = (groupUsers as any).data.map((groupUser) => {
        return groupUser.userId
      })
    } else if (channel.channelType === 'user') {
      targetIds = [channel.userId1, channel.userId2]
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return Promise.all(targetIds.map((userId: string) => {
      return app.channel(`userIds/${userId}`).send({
        message: data
      })
    }))
  })

  service.publish('removed', async (data): Promise<any> => {
    const channel = await app.service('channel').get(data.channelId)
    let targetIds = []
    if (channel.channelType === 'party') {
      const partyUsers = await app.service('party-user').find({
        query: {
          $limit: 1000,
          partyId: channel.partyId
        }
      })

      targetIds = (partyUsers as any).data.map((partyUser) => {
        return partyUser.userId
      })
    } else if (channel.channelType === 'group') {
      const groupUsers = await app.service('group-user').find({
        query: {
          $limit: 1000,
          groupId: channel.groupId
        }
      })

      targetIds = (groupUsers as any).data.map((groupUser) => {
        return groupUser.userId
      })
    } else if (channel.channelType === 'user') {
      targetIds = [channel.userId1, channel.userId2]
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return Promise.all(targetIds.map((userId: string) => {
      return app.channel(`userIds/${userId}`).send({
        message: data
      })
    }))
  })

  service.publish('patched', async (data): Promise<any> => {
    const channel = await app.service('channel').get(data.channelId)
    let targetIds = []
    if (channel.channelType === 'party') {
      const partyUsers = await app.service('party-user').find({
        query: {
          $limit: 1000,
          partyId: channel.partyId
        }
      })

      targetIds = (partyUsers as any).data.map((partyUser) => {
        return partyUser.userId
      })
    } else if (channel.channelType === 'group') {
      const groupUsers = await app.service('group-user').find({
        query: {
          $limit: 1000,
          groupId: channel.groupId
        }
      })

      targetIds = (groupUsers as any).data.map((groupUser) => {
        return groupUser.userId
      })
    } else if (channel.channelType === 'user') {
      targetIds = [channel.userId1, channel.userId2]
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return Promise.all(targetIds.map((userId: string) => {
      return app.channel(`userIds/${userId}`).send({
        message: data
      })
    }))
  })
}
