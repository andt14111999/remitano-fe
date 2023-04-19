import APIs from 'apis'
import constants from 'constants-custom'
import { rest } from 'msw'

export const handlers = [
  rest.get(APIs.videos, (req, res, ctx) => {
    return res(
      ctx.json([{
        title: 'Adele - Hello (Official Music Video)',
        embeddedURL: 'https://www.youtube.com/embed/YQHsXMglC9A',
        videoURL: 'https://www.youtube.com/watch?v=YQHsXMglC9A',
        description: 'Listen to "Easy On Me" here: http://Adele.lnk.to/EOM',
        userEmail: 'abc@gmail.com',
        "_id": '231231241241241224214',
        "__v": '232132132142141',
      },
      {
        title: 'LÀ ANH - Cover Nhạc Ngoại Lời Việt by PHẠM LỊCH ( Its You -Mộng Nhiên)',
        embeddedURL: 'https://www.youtube.com/embed/6-LmZLjS5WI',
        videoURL: 'https://www.youtube.com/watch?v=6-LmZLjS5WI',
        description: 'Là Anh - Phạm Lịch  #laanh #phamlich Stream audio on: ',
        userEmail: 'abc@gmail.com',
        "_id": '2312312412412412',
        "__v": '23213213214214',
      }
      ])
    )
  }),
  rest.post(APIs.videos, (req, res, ctx) => {
    return res(
      ctx.json({
        title: 'LÀ ANH - Cover Nhạc Ngoại Lời Việt by PHẠM LỊCH ( Its You -Mộng Nhiên)',
        embeddedURL: 'https://www.youtube.com/embed/6-LmZLjS5WI',
        videoURL: 'https://www.youtube.com/watch?v=6-LmZLjS5WI',
        description: 'Là Anh - Phạm Lịch  #laanh #phamlich Stream audio on: ',
        userEmail: 'abc@gmail.com',
        "_id": '2312312412412412',
        "__v": '23213213214214',
      })
    )
  }),
  rest.post(APIs.register, (req, res, ctx) => {
    return res(
      ctx.json(constants.TEST_TOKEN)
    )
  }),
  rest.post(APIs.login, (req, res, ctx) => {
    return res(
      ctx.json(constants.TEST_TOKEN)
    )
  })
]