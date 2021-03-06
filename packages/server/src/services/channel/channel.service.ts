import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Channel } from './channel.class'
import createModel from '../../models/channel.model'
import hooks from './channel.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'channel': Channel & ServiceAddons<any>;
  }
}

export default (app: Application): any => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/channel', new Channel(options, app))

  const service = app.service('channel')

  service.hooks(hooks)

  service.publish('created', async (data): Promise<any> => {
    try {
      let targetIds
      if (data.channelType === 'user') {
        data.user1 = await app.service('user').get(data.userId1)
        data.user2 = await app.service('user').get(data.userId2)
        const user1AvatarResult = await app.service('static-resource').find({
          query: {
            staticResourceType: 'user-thumbnail',
            userId: data.userId1
          }
        }) as any

        const user2AvatarResult = await app.service('static-resource').find({
          query: {
            staticResourceType: 'user-thumbnail',
            userId: data.userId2
          }
        }) as any

        if (user1AvatarResult.total > 0) {
          data.user1.dataValues.avatarUrl = user1AvatarResult.data[0].url
        }

        if (user2AvatarResult.total > 0) {
          data.user2.dataValues.avatarUrl = user2AvatarResult.data[0].url
        }
        targetIds = [data.userId1, data.userId2]
      } else if (data.channelType === 'group') {
        if (data.group == null) {
          data.group = await app.service('group').Model.findOne({
            where: {
              id: data.groupId
            }
          })
        }
        const groupUsers = await app.service('group-user').Model.findAll({
          where: {
            groupId: data.groupId
          },
          include: [
            {
              model: app.service('user').Model
            }
          ]
        })
        await Promise.all(groupUsers.map(async (groupUser) => {
          const avatarResult = await app.service('static-resource').find({
            query: {
              staticResourceType: 'user-thumbnail',
              userId: groupUser.userId
            }
          }) as any

          if (avatarResult.total > 0) {
            groupUser.dataValues.user.dataValues.avatarUrl = avatarResult.data[0].url
          }

          return await Promise.resolve()
        }))

        if (data.group.dataValues) {
          data.group.dataValues.groupUsers = groupUsers
        } else {
          data.group.groupUsers = groupUsers
        }
        targetIds = groupUsers.map((groupUser) => groupUser.userId)
      } else if (data.channelType === 'party') {
        if (data.party == null) {
          data.party = await app.service('party').Model.findOne({
            where: {
              id: data.partyId
            }
          })
        }
        const partyUsers = await app.service('party-user').Model.findAll({
          where: {
            partyId: data.partyId
          },
          include: [
            {
              model: app.service('user').Model
            }
          ]
        })
        await Promise.all(partyUsers.map(async (partyUser) => {
          const avatarResult = await app.service('static-resource').find({
            query: {
              staticResourceType: 'user-thumbnail',
              userId: partyUser.userId
            }
          }) as any

          if (avatarResult.total > 0) {
            partyUser.dataValues.user.dataValues.avatarUrl = avatarResult.data[0].url
          }

          return await Promise.resolve()
        }))
        if (data.party.dataValues) {
          data.party.dataValues.partyUsers = partyUsers
        } else {
          data.party.partyUsers = partyUsers
        }
        targetIds = partyUsers.map((partyUser) => partyUser.userId)
      }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return Promise.all(targetIds.map((userId) => {
        return app.channel(`userIds/${userId}`).send({
          channel: data
        })
      }))
    } catch(err) {
      console.log(err)
      throw err
    }
  })

  service.publish('patched', async (data): Promise<any> => {
    try {
      let targetIds
      if (data.channelType === 'user') {
        data.user1 = await app.service('user').get(data.userId1)
        data.user2 = await app.service('user').get(data.userId2)
        const user1AvatarResult = await app.service('static-resource').find({
          query: {
            staticResourceType: 'user-thumbnail',
            userId: data.userId1
          }
        }) as any

        const user2AvatarResult = await app.service('static-resource').find({
          query: {
            staticResourceType: 'user-thumbnail',
            userId: data.userId2
          }
        }) as any

        if (user1AvatarResult.total > 0) {
          data.user1.dataValues.avatarUrl = user1AvatarResult.data[0].url
        }

        if (user2AvatarResult.total > 0) {
          data.user2.dataValues.avatarUrl = user2AvatarResult.data[0].url
        }
        targetIds = [data.userId1, data.userId2]
      } else if (data.channelType === 'group') {
        if (data.group == null) {
          data.group = await app.service('group').Model.findOne({
            where: {
              id: data.groupId
            }
          })
        }
        const groupUsers = await app.service('group-user').Model.findAll({
          where: {
            groupId: data.groupId
          },
          include: [
            {
              model: app.service('user').Model
            }
          ]
        })
        await Promise.all(groupUsers.map(async (groupUser) => {
          const avatarResult = await app.service('static-resource').find({
            query: {
              staticResourceType: 'user-thumbnail',
              userId: groupUser.userId
            }
          }) as any

          if (avatarResult.total > 0) {
            groupUser.dataValues.user.dataValues.avatarUrl = avatarResult.data[0].url
          }

          return await Promise.resolve()
        }))

        if (data.group.dataValues) {
          data.group.dataValues.groupUsers = groupUsers
        } else {
          data.group.groupUsers = groupUsers
        }
        targetIds = groupUsers.map((groupUser) => groupUser.userId)
      } else if (data.channelType === 'party') {
        if (data.party == null) {
          data.party = await app.service('party').Model.findOne({
            where: {
              id: data.partyId
            }
          })
        }
        const partyUsers = await app.service('party-user').Model.findAll({
          where: {
            partyId: data.partyId
          },
          include: [
            {
              model: app.service('user').Model
            }
          ]
        })
        await Promise.all(partyUsers.map(async (partyUser) => {
          const avatarResult = await app.service('static-resource').find({
            query: {
              staticResourceType: 'user-thumbnail',
              userId: partyUser.userId
            }
          }) as any

          if (avatarResult.total > 0) {
            partyUser.dataValues.user.dataValues.avatarUrl = avatarResult.data[0].url
          }

          return await Promise.resolve()
        }))
        if (data.party.dataValues) {
          data.party.dataValues.partyUsers = partyUsers
        } else {
          data.party.partyUsers = partyUsers
        }
        targetIds = partyUsers.map((partyUser) => partyUser.userId)
      }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return Promise.all(targetIds.map((userId) => {
        return app.channel(`userIds/${userId}`).send({
          channel: data
        })
      }))
    } catch(err) {
      console.log(err)
      throw err
    }
  })

  service.publish('removed', async (data): Promise<any> => {
    let targetIds
    if (data.channelType === 'user') {
      targetIds = [data.userId1, data.userId2]
    } else if (data.channelType === 'group') {
      const groupUsers = await app.service('group-user').Model.findAll({
        where: {
          groupId: data.groupId
        }
      })
      targetIds = groupUsers.map((groupUser) => groupUser.userId)
    } else if (data.channelType === 'party') {
      const partyUsers = await app.service('party-user').Model.findAll({
        where: {
          partyId: data.partyId
        }
      })
      targetIds = partyUsers.map((partyUser) => partyUser.userId)
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return Promise.all(targetIds.map((userId) => {
      return app.channel(`userIds/${userId}`).send({
        channel: data
      })
    }))
  })
}
