import Post from "../models/Post.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const searchTags = async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page);
  const postsPerPage = parseInt(req.query.limit);
  const startIndex = (page - 1) * postsPerPage;

  // search through tags
  try {
    const terms = query.split(" ").map((term) => new RegExp(term.trim(), "i"));
    const searchQuery = await Post.aggregate([
      {
        $match: {
          tags: { $in: terms },
          isPrivate: false, // filter out private posts
          isBanned: false, // filter out banned posts
        },
      },
      {
        $addFields: {
          score: {
            $size: {
              $setIntersection: [terms, "$tags"],
            },
          },
        },
      },
      {
        $sort: { score: -1, createdAt: -1 },
      },
    ])
      .skip(startIndex)
      .limit(postsPerPage);

    res.status(200).json({ success: true, result: searchQuery });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to find posts, error: ${error}`,
    });
  }
};

export const mostPopularTags = async (req, res) => {
  try {
    const most = parseInt(req.params.most);
    const searchQuery = await Post.aggregate([
      // Match documents with non-empty tags array and isPrivate: false and isBanned: false
      {
        $match: {
          tags: { $exists: true, $ne: [] },
          isPrivate: false,
          isBanned: false,
        },
      },

      // Group documents by tag and count their occurrences
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },

      // Sort documents by count in descending order
      { $sort: { count: -1 } },

      // Get the top N tags
      { $limit: most },

      // Project only the tag name
      { $project: { _id: 0, tag: "$_id" } },
    ]);
    const tags = searchQuery.map((item) => item.tag);
    res.status(200).json({ success: true, result: tags });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to find posts, error: ${error}`,
    });
  }
};

//search through users
export const searchUsers = async (req, res) => {
  try {
    const { firstName, lastName, birthday, country, email } = req.query;

    if (!firstName && !lastName && !birthday && !country && !email) {
      return res.status(400).json({
        success: false,
        msg: "At least one search parameter is required",
      });
    }

    const searchQuery = await User.aggregate([
      {
        $match: {
          $or: [
            firstName ? { firstName: new RegExp(firstName, "i") } : null,
            lastName ? { lastName: new RegExp(lastName, "i") } : null,
            birthday ? { birthday: new Date(birthday) } : null,
            country ? { country: new RegExp(country, "i") } : null,
            email ? { email: new RegExp(email, "i") } : null,
          ].filter((condition) => condition !== null),
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          birthday: 1,
          country: 1,
          email: 1,
          profilePicture: 1,
          bio: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, result: searchQuery });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to find users, error: ${error}`,
    });
  }
};
