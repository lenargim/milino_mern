import UserModel from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const sort = req.body.sort;
    const page = req.body.page;
    let resultsPerPage = 50;

    const doc = await UserModel
      .find({is_super_user: {$ne: true}})
      .skip((page-1) * resultsPerPage)
      .limit(resultsPerPage + 1)
      .sort(sort)
      .collation({caseLevel: false, locale: 'en'});

    if (!doc) {
      return res.status(400).json({
        message: "No users"
      })
    }


    let hasNextPage = false;
    if (doc.length > resultsPerPage) {
      hasNextPage = true;
      doc.pop();
    }
    const users = doc.map(user => ({
      _id: user._doc._id,
      email: user._doc.email,
      name: user._doc.name,
      company: user._doc.company,
      is_active: user._doc.is_active,
      is_active_in_constructor: user._doc.is_active_in_constructor || false,
      createdAt: user._doc.createdAt
    }));
    res.status(200).json({
      users,
      hasNextPage,
      sort,
      page
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Getting users failed"
    })
  }
}

export const toggleUserEnabled = async (req, res) => {
  try {

    const doc = await UserModel.findByIdAndUpdate(req.params.userId, {
      $set: {
        "is_active": req.body.is_active,
        "is_active_in_constructor": req.body.is_active_in_constructor
      },
    }, {
      returnDocument: "after"
    })
    if (!doc) {
      return res.status(400).json({
        message: "No user"
      })
    }
    res.status(200).json(doc._doc)
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Toggle user failed"
    })
  }
}
