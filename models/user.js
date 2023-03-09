const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  name: {
    type: String,
  },
  companyname: {
    type: String,
  },
  industry: {
    type: String,
  },
  avatar: {
    type: String,
    default: 'http://bit.ly/3Pd3qh0',
  },
  profile: {
    type: String,
  },
  followers: [
    {
      followerId: {
        type: String
      },
      followerName: {
        type: String
      },
      follwerAvatar: {
        type: String
      }
    }
  ],
  messages: [
    {
      messagerId: {
        type: String
      },
      messagerName: {
        type: String
      },
      messagerAvatar: {
        type: String
      },
      pitchId: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
},
  {
    timestamps: true,
  },
)

const User = mongoose.model('users', userSchema)
module.exports = User
