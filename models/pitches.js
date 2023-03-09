const mongoose = require('mongoose')

const pitchSchema = new mongoose.Schema(
  {
    entrepreneurId: {
      type: String,
    },
    entrepreneurName: {
      type: String,
    },
    entrepreneurAvatar: {
      type: String,
    },
    pitchTitle: {
      type: String,
    },
    pitchIdea: {
      type: String,
    },
    pitchImage: {
      type: String,
    },
    askAmount: {
      type: String,
    },
    equity: {
      type: String,
    },
    likes: [
      {
        likerId: {
          type:String,
        }
      }
    ],
    comments: [
      {
        userID: {
          type: String,
        },
        name: {
          type : String
        },
        avatar: {
          type : String
        },
        userType: {
          type: String,
        },
        commentText: {
          type: String,
        },
        date: {
            type: Date,
            default : Date.now
        }
      }
    ],
    offers: [
      {
        investorId: {
          type: String,
        },
        investorName: {
          type : String
        },
        avatar: {
          type : String
        },
        amount: {
          type: String,
        },
        equity: {
          type: String,
        },
        comment: {
          type: String,
        },
        date: {
            type: Date,
            default : Date.now
        },
        
      }
    ]
  },
  {
    timestamps: true,
  },
)

const Pitch = mongoose.model('pitch', pitchSchema)
module.exports = Pitch
