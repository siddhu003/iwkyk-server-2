import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String, default: " "},
    tags: { type: [String]},
    joinedOn: { type: Date, default: Date.now },
    accountType: { type: String, default: 'Free' },
    //follow: [{ followid: String }]
    follow: { type: [String], default: [] },
    followers: { type: [String], default: [] }
    // follow: [{
    //     followId: String,
    //     followName: String
    // }]
})

export default mongoose.model("User",userSchema)
