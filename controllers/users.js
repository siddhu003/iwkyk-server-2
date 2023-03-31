import mongoose from "mongoose"
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = []

        allUsers.forEach(users => {
            allUserDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn, follow: users.follow })
        })

        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('Question Unavailable...');
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
}

export const updateCurrentPlan = async (req, res) => {
    const { id: _id } = req.params;
    const { currentPlan } = req.body;

    try {
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: { 'currentPlan': currentPlan } }, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
}

export const updateFollow = async (req, res) => {
    const { id: _id } = req.params;
    // const { followId, followName } = req.body;
    const { followId} = req.body;
    
    try {
        //const updatedProfile = await User.findByIdAndUpdate(_id, { $push: { 'follow': followId } });
        //res.status(200).json(updatedProfile)
        const user = await User.findById(_id);

        const followIndex = user.follow.findIndex((id) => id === String(followId))  

        if (followIndex === -1)
        {
            user.follow.push(followId);
            //await User.findByIdAndUpdate(_id, { $addToSet: { 'follow':[{followId,followName}]} })
        }
        // user.follow.addToSet([{ followId, followName }]);
        // await User.findByIdAndUpdate(_id, { $addToSet: { 'follow':[{followId,followName}]} })
        await User.findByIdAndUpdate(_id, user);
        //res.status(200).json({ message: "Successful" })

        const user1 = await User.findById(followId);
        const followerIndex = user1.followers.findIndex((id) => id === String(_id))

        if (followerIndex === -1)
        {
            user1.followers.push(_id);
        }
        await User.findByIdAndUpdate(followId, user1);

        res.status(200).json(user)   

        //res.status(200).json(followId)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateUnFollow = async (req, res) => {
    const { id: _id } = req.params;
    const { followId } = req.body;
    
    try {

        const user = await User.findById(_id);
        // await Questions.updateOne(
        //     { _id },
        //     { $pull: { 'answer': { _id: answerId } } }
        // )
        
        // await User.updateOne(
        //     { id },
        //     { $pull: { 'follow': { _id: followId } } }
        // )
        const followIndex = user.follow.findIndex((id) => id === String(followId))  

        if (followIndex !== -1)
        {
            user.follow.pull(followId);
            //await User.findByIdAndUpdate(_id, { $addToSet: { 'follow':[{followId,followName}]} })
        }
        await User.findByIdAndUpdate(_id, user);


        const user1 = await User.findById(followId);
        const followerIndex = user1.followers.findIndex((id) => id === String(_id))

        if (followerIndex !== -1)
        {
            user1.followers.pull(_id);
        }
        await User.findByIdAndUpdate(followId, user1);

        res.status(200).json(user);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
