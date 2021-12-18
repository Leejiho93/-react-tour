import Comment from "../models/comment";
import * as express from "express";
import { isLoggedIn } from "./middleware";
import User from "../models/user";

const router = express.Router();

router.post(`/:id`, isLoggedIn, async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      contentId: req.params.id,
      UserId: req.user!.id,
      content: req.body.content,
    });

    const comment = await Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    return res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get(`/:id`, async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        contentId: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    return res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete(`/:id`, isLoggedIn, async (req, res, next) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    await Comment.update(
      { content: req.body.content },
      { where: { id: req.params.id } }
    );

    return res.send({ id: req.params.id, editComment: req.body.content });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
